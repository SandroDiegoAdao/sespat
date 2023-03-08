import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import { User } from 'src/@types/user';
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, jwtDecode, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: {} as User,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: {} as User,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const { id, name } = jwtDecode(accessToken);

        const user = await getUser(id, name);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: {} as User,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: {} as User,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const formatedEmail = email.toLowerCase();

    const response = await axios.post('/api/usuarios:login', {
      email: formatedEmail,
      password,
    });

    const token = response.data;
    setSession(token);

    const { id, name } = jwtDecode(token);

    const user = await getUser(id, name);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

const getUser = async (id: string, name: string) => {
  const { data: user } = await axios.get(`/api/usuarios/${id}`);

  let role = 'solicitante';
  if (user.isAdmin) {
    role = 'admin';
  }

  if (!user.isAdmin && user.isSupervisor) {
    role = 'supervisor';
  }

  const splittedName = name.split(' ');

  return {
    ...user,
    nome: splittedName[0],
    sobrenome: splittedName.slice(1).join(' '),
    permissao: role,
  };
};

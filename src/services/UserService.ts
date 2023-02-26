import { User } from 'src/@types/user';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

export async function getAllUsers() {
  const { data } = await axios.get<Array<User>>('api/usuarios');

  return data;
}

// ----------------------------------------------------------------------

export async function create(user: User) {
  await axios.post<User>('api/usuarios', user);
}

// ----------------------------------------------------------------------

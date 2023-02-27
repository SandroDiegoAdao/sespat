import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { createUser } from 'src/hooks/user/useUser';
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { User } from '../../../@types/user';
// assets
import { filials, roles } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { CustomFile } from '../../../components/upload';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<User, 'foto'> {
  foto: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: User;
};

type OptionType = {
  code: string;
  label: string;
};

export default function UserNewEditForm({ isEdit = false, currentUser }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    sobrenome: Yup.string().required('O sobrenome é obrigatório'),
    email: Yup.string().required('O email é obrigatório').email('O email é inválido'),
    unidade: Yup.object().required('A unidade é obrigatória'),
    role: Yup.object().required('O cargo é obrigatório'),
    supervisor: Yup.string().required('O supervisor é obrigatório'),
  });

  const defaultValues = useMemo(
    () => ({
      nomeCompleto: currentUser?.nomeCompleto || '',
      email: currentUser?.email || '',
      unidade: currentUser?.unidade,
      cargo: currentUser?.cargo,
      status: false,
      isSupervisor: false,
      foto: currentUser?.foto || '',
      senha: '123456',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    const newUser = {
      ...data,
      email: data.email.toLowerCase(),
      nomeCompleto: `${data.nome} ${data.sobrenome}`,
    };

    try {
      await createUser(newUser);
      reset();
      enqueueSnackbar(!isEdit ? 'Criado com sucesso!' : 'Atualizado com sucesso!');
      navigate(PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('foto', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 3, px: 3 }}>
            <Stack spacing={4}>
              <Label
                color={values.isSupervisor ? 'info' : 'default'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.isSupervisor ? 'Supervisor' : 'Solicitante'}
              </Label>

              <Box sx={{ pt: 2 }}>
                <RHFUploadAvatar
                  name="foto"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Permitido *.jpeg, *.jpg, *.png, *.gif
                      <br /> tamanho máximo de {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              <RHFSwitch
                name="isSupervisor"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Supervisor
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Define o usuário como supervisor.
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="overline">Pessoal</Typography>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="nome" label="Nome" />
                <RHFTextField name="sobrenome" label="Sobrenome" />
              </Box>

              <RHFTextField name="email" label="E-mail" />

              <Typography variant="overline">Profissional</Typography>

              <RHFAutocomplete
                name="unidade"
                label="Unidade"
                options={filials}
                getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
              />

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFAutocomplete
                  name="role"
                  label="Cargo"
                  options={roles.slice(1)}
                  getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                />
                <RHFAutocomplete
                  name="supervisor"
                  label="Supervisor"
                  options={['John Doe', 'Fulano da Silva', 'Ciclano Souza', 'Beltrano dos Santos']}
                  getOptionLabel={(option: string) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              </Box>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Criar' : 'Salvar'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

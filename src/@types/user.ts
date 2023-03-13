// ----------------------------------------------------------------------

import { CustomFile } from 'src/components/upload/types';

export type User = {
  id: string;
  nomeCompleto: string;
  nome: string;
  sobrenome: string;
  email: string;
  cargo: string;
  permissao: string;
  foto: CustomFile | string | null | undefined;
  supervisor: string;
  supervisorId: number;
  unidade: string;
  isSupervisor: boolean;
  isAdmin: boolean;
  situacao: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IUserAccountNotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

// ----------------------------------------------------------------------

export type User = {
  id: string;
  nomeCompleto: string;
  email: string;
  cargo: string;
  foto: string;
  supervisor: string;
  unidade: string;
  isSupervisor: boolean;
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

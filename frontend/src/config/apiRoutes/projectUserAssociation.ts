export const API_PROJECT_USER_ASSOCIATION = {
  BUILD: () => `/ProjectUserAssociation/Build`,
  GETUSERS: (token: string) =>
    `/ProjectUserAssociation/GetUsers?token=${token}`,
  PREPARE: (token: string) => `/ProjectUserAssociation/Prepare?token=${token}`,
  SAVE: () => `/ProjectUserAssociation/Save`,
};

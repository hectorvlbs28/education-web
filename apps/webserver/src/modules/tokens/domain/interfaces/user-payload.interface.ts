export interface IUserPayload {
  id: string;
  name: string;
  email: string;
  roles: IUserRoles[];
}

export interface IUserRoles {
  id: string;
  name: string;
  description: string;
  status: string;
  permissions: IPermissionUserRoles[];
  createdAt: string;
}

export interface IPermissionUserRoles {
  id: string;
  name: string;
  description: string;
}

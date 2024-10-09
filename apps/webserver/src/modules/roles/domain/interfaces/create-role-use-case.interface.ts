export interface ICreateRolePayloadUseCase {
  name: string;
  description: string;
  status?: string;
  permissionIds: string[];
}

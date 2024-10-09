export interface IUseCase {
  process(command: any): Promise<any>;
}

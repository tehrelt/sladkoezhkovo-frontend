export interface IService<T> {
  findAll(): T[];
  find(id: string): T;
}

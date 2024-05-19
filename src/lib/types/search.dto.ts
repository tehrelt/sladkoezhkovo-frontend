export interface SearchResults {
  users: UserResult[];
  factories: FactoryResult[];
  products: ProductResult[];
}

export interface UserResult {
  handle: string;
  lastName: string;
  firstName: string;
  middleName: string;
  image?: string;
}

export interface FactoryResult {
  handle: string;
  name: string;
  image?: string;
}

export interface ProductResult {
  id: string;
  name: string;
  image?: string;
}

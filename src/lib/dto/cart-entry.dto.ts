export interface CartEntry {
  userId: string;
  catalogueId: string;
  quantity: number;
  catalogueEntry: CatalogueEntry;
  image: string;
  total: number;
}

export interface CatalogueEntry {
  id: string;
  createdAt: string;
  updatedAt: any;
  productId: string;
  packageId: string;
  price: number;
  unitUsage: number;
  package: Package;
  product: Product;
}

interface Package {
  id: string;
  createdAt: string;
  updatedAt: any;
  name: string;
  unitId: string;
  unit: Unit;
}

interface Unit {
  name: string;
}

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: any;
  name: string;
  confectionaryTypeId: string;
  factoryId: string;
  imageId: string;
  weight: string;
  image: Image;
}

export interface Image {
  createdAt: string;
  updatedAt: any;
  id: string;
  name: string;
}

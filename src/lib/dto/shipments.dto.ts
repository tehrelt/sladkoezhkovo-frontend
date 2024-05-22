export interface ShopShipment {
  id: string;
  shop: Shop;
  cost: string;
  createdAt: Date;
}

export interface Shop {
  name: string;
  handle: string;
}

export interface CreateShopDto {
  name: string;
  handle: string;
  phoneNumber: number;
  employeesCount: number;
  districtId: string;
  openSince: number;
  file: File;
}

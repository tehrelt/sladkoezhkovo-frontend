import { api } from '@/api/axios.config';
import { CreateProductDto } from '@/lib/dto/create-product.dto';
import { Product } from '@/lib/types/domain/product.dto';
import { ListDto } from '@/lib/types/list.dto';

export class ProductService {
  static async create(dto: CreateProductDto) {
    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('confectionaryTypeId', dto.confectionaryTypeId);
    formData.append('factoryId', dto.factoryId);
    formData.append('file', dto.file);

    const response = await api.post<Product>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async list(): Promise<ListDto<Product>> {
    const response = await api.get<ListDto<Product>>('/products');
    return response.data;
  }

  static async listByFactory(factorySlug: string): Promise<ListDto<Product>> {
    const response = await api.get<ListDto<Product>>(
      `/factories/${factorySlug}/products`,
    );
    return response.data;
  }

  static async find(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }
}

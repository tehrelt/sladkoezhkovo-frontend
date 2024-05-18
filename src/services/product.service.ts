import { api } from '@/api/axios.config';
import { CreateProductDto } from '@/lib/dto/create-product.dto';
import { Product } from '@/lib/types/domain/product.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';

export class ProductService {
  static BASE_URL = '/products';

  static async create(dto: CreateProductDto) {
    const formData = new FormData();

    Object.keys(dto).forEach((key) => {
      formData.append(key, dto[key]);
    });

    // formData.append('name', dto.name);
    // formData.append('confectionaryTypeId', dto.confectionaryTypeId);
    // formData.append('factoryId', dto.factoryId);
    // formData.append('file', dto.file);

    const response = await api.post<Product>(this.BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async list(f?: FiltersDto): Promise<ListDto<Product>> {
    const response = await api.get<ListDto<Product>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async listByFactory(factorySlug: string): Promise<ListDto<Product>> {
    const response = await api.get<ListDto<Product>>(
      `/factories/${factorySlug}/products`,
    );
    return response.data;
  }

  static async find(id: string): Promise<Product> {
    const response = await api.get<Product>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  static async findOwner(id: string): Promise<{ handle: string }> {
    const response = await api.get<{ handle: string }>(
      `${this.BASE_URL}/${id}/owner`,
    );
    return response.data;
  }
}

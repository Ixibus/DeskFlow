import type { HttpClient } from "@/data/api/HttpClient";
import type { Product } from "@/utils/types/Product";
import { API_ROUTES } from "@/utils/constants/apiRoutes";

export class ProductRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  create(product: Product): Promise<Product> {
    return this.http.post<Product>(API_ROUTES.PRODUCTS, product);
  }

  update(id: number, product: Product): Promise<Product> {
    return this.http.put<Product>(`${API_ROUTES.PRODUCTS}/${id}`, product);
  }

  getAll(): Promise<Product[]> {
    return this.http.get<Product[]>(API_ROUTES.PRODUCTS);
  }
}

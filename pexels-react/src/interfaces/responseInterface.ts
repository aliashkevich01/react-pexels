import { PhotoInterface } from './PhotoInterface';

export interface ResponseInterface {
  total_results: number;
  page: string | number;
  per_page: number;
  photos: Array<PhotoInterface>;
  prev_page?: string;
  next_page?: string;
}

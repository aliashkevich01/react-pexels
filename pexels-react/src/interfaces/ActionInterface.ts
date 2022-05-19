import { PhotoInterface } from "./PhotoInterface";
import { ResponseInterface } from "./responseInterface";

export interface ActionInterface {
    type: string;
    payload: PayloadInterface;
}

export interface PayloadInterface {
  query: string;
  page: number;
  orientation:string; 
  size: string; 
  data: ResponseInterface;
  color: string;
  backPhoto?: PhotoInterface;
  locale: string;
}
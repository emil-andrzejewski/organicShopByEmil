import { Product } from './product';

export interface ProductFirebase {
  key: string
  payload: Product
  prevkey: any
  type: string
}
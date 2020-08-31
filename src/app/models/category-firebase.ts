import { Category } from './category';

export interface CategoryFirebase {
  key: string
  payload: Category
  prevkey: any
  type: string
}

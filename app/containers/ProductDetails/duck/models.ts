import { IProductsListElementState } from 'containers/ProductsList/duck/models';

export interface IProductDetailsState extends IProductsListElementState {}

export const initialProductDetailsState: IProductDetailsState = {
  id: '',
  name: '',
  number: '',
  description: '',
  images: []
};

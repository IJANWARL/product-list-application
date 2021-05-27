export interface IImageState {
  url: string;
  name: string;
}

export interface IProductsListElementState {
  id: string;
  name: string;
  number: string;
  description: string;
  images: IImageState[];
}

export interface IProductsListState {
  list: IProductsListElementState[];
}

export const initialListState: IProductsListState = {
  list: []
};

export const initialImageState: IImageState = {
  url: '',
  name: ''
};

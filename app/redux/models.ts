import {
  IProductDetailsState,
  initialProductDetailsState
} from 'containers/ProductDetails/duck/models';
import {
  IProductsListState,
  initialListState
} from 'containers/ProductsList/duck/models';

interface IState {
  productsList: IProductsListState;
  productsDetails: IProductDetailsState;
}

export const initialState: IState = {
  productsList: initialListState,
  productsDetails: initialProductDetailsState
};

export default IState;

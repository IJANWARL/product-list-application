import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import RestClient from 'services/RestClient/RestClient';

import { IProductsListElementState } from './models';

export const resetStateAction = createAction('PRODUCTS_LIST/RESET_STATE');

export const fetchProductListAction = createAsyncThunk<
  IProductsListElementState[]
>('PRODUCTS_LIST/FETCH_LIST', async (_, thunkApi) =>
  RestClient.fetchProductsList().then(
    response => {
      const list: IProductsListElementState[] = response.data.map(
        (el, idx) => ({
          ...el,
          id: idx.toString()
        })
      );
      return list;
    },
    () =>
      // error handling
      thunkApi.rejectWithValue('')
  )
);

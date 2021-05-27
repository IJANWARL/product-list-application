import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import pageUrls from 'pageUrls';
import RestClient from 'services/RestClient/RestClient';
import { redirect } from 'utils/history';

import { IProductDetailsState } from './models';

export const resetStateAction = createAction('PRODUCTS_DETAILS/RESET_STATE');

export const fetchProductDetailsAction = createAsyncThunk<
  IProductDetailsState,
  string
>('PRODUCTS_DETAILS/FETCH_DATA', async (productId, thunkApi) =>
  RestClient.fetchProductsDetails(productId).then(
    response => {
      const { data } = response;
      return data;
    },
    () => {
      redirect(pageUrls.ROOT);
      return thunkApi.rejectWithValue('');
    }
  )
);

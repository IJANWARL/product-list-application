import { createReducer } from '@reduxjs/toolkit';

import { resetStateAction, fetchProductListAction } from './actions';
import { initialListState } from './models';

const productsList = createReducer(initialListState, builder => {
  builder
    .addCase(resetStateAction, () => ({
      ...initialListState
    }))
    .addCase(fetchProductListAction.pending, () => {
      // add loader
    })
    .addCase(fetchProductListAction.fulfilled, (state, action) => {
      // remove loader
      state.list = action.payload;
    })
    .addCase(fetchProductListAction.rejected, () => {
      // remove loader
    });
});

export default productsList;

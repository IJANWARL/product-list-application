import { createReducer } from '@reduxjs/toolkit';

import { resetStateAction, fetchProductDetailsAction } from './actions';
import { initialProductDetailsState } from './models';

const productsDetails = createReducer(initialProductDetailsState, builder => {
  builder
    .addCase(resetStateAction, () => ({
      ...initialProductDetailsState
    }))
    .addCase(fetchProductDetailsAction.pending, () => {
      // add loader
    })
    .addCase(fetchProductDetailsAction.fulfilled, (_, action) =>
      // remove loader
      ({ ...action.payload })
    )
    .addCase(fetchProductDetailsAction.rejected, () => {
      // remove loader
    });
});

export default productsDetails;

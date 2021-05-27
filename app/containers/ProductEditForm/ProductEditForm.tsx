import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IProductDetailsState } from 'containers/ProductDetails/duck/models';
import {
  IImageState,
  initialImageState
} from 'containers/ProductsList/duck/models';
import { getProductDetails } from 'containers/ProductDetails/duck/selectors';
import {
  fetchProductDetailsAction,
  resetStateAction
} from 'containers/ProductDetails/duck/actions';
import { saveToLocalStorage } from 'utils/localStorageHandler';
import { redirectBack } from 'utils/history';

import {
  SaveButtonWrapper,
  AddButtonWrapper,
  MediumTextInput,
  BigTextInput,
  TextInput,
  Header,
  Row
} from './styled-components';

interface IDetailsUrlParams {
  productId: string;
}

const ProductDetails = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { productId } = useParams<IDetailsUrlParams>();
  const startFormData = useAppSelector(getProductDetails);
  const [formData, setFormData] = useState<IProductDetailsState>(startFormData);

  const resetState = () => {
    dispatch(resetStateAction());
  };

  useEffect(() => {
    dispatch(fetchProductDetailsAction(productId));
    () => resetState();
  }, []);

  useEffect(() => {
    setFormData(startFormData);
  }, [startFormData]);

  const { id, name, number, description, images } = formData;

  const saveForm = () => {
    saveToLocalStorage(`EDITED_${id}`, JSON.stringify(formData));
    redirectBack();
  };

  const addImage = () =>
    setFormData({
      ...formData,
      images: [initialImageState, ...formData.images]
    });

  const setImageData = (imageIdx: number, data: IImageState) =>
    setFormData({
      ...formData,
      images: formData.images.map((image, idx) =>
        imageIdx === idx ? data : image
      )
    });

  const removeImage = (imageIdx: number) =>
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => imageIdx !== idx)
    });

  return (
    <>
      <Helmet>
        <title>{t('titles.edit')}</title>
      </Helmet>
      <SaveButtonWrapper>
        <Button color="primary" variant="contained" onClick={saveForm}>
          <SaveIcon style={{ marginRight: '10px' }} />
          {t('common.save')}
        </Button>
      </SaveButtonWrapper>
      <Header>{t('headers.basicData')}</Header>
      <Row>
        <TextInput
          type="text"
          value={name}
          name={t('labels.name')}
          label={t('labels.name')}
          placeholder={t('labels.number')}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <TextInput
          type="text"
          value={number}
          name={t('labels.number')}
          label={t('labels.number')}
          placeholder={t('labels.number')}
          onChange={e => setFormData({ ...formData, number: e.target.value })}
        />
      </Row>
      <Row>
        <BigTextInput
          multiline
          type="text"
          value={description}
          name={t('labels.description')}
          label={t('labels.description')}
          placeholder={t('labels.description')}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Row>
      <Header>{t('headers.images')}</Header>
      <AddButtonWrapper>
        <Button color="primary" variant="contained" onClick={addImage}>
          <AddIcon style={{ marginRight: '10px' }} />
          {t('addImage')}
        </Button>
      </AddButtonWrapper>
      {images.map((image, idx) => (
        <Row key={idx.toString()}>
          <TextInput
            type="text"
            value={image.name}
            name={t('labels.imageName')}
            label={t('labels.imageName')}
            placeholder={t('labels.imageName')}
            onChange={e =>
              setImageData(idx, { ...image, name: e.target.value })
            }
          />
          <MediumTextInput
            type="text"
            value={image.url}
            name={t('labels.imageUrl')}
            label={t('labels.imageUrl')}
            placeholder={t('labels.imageUrl')}
            onChange={e => setImageData(idx, { ...image, url: e.target.value })}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={() => removeImage(idx)}
          >
            <ClearIcon />
          </Button>
        </Row>
      ))}
    </>
  );
};

export default ProductDetails;

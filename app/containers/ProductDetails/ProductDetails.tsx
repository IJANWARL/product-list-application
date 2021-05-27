import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Button } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import pageUrls from 'pageUrls';

import { fetchProductDetailsAction, resetStateAction } from './duck/actions';
import { getProductDetails } from './duck/selectors';
import { ButtonLink, Column, Header, Row } from './styled-components';

interface IDetailsUrlParams {
  productId: string;
}

const ProductDetails = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { productId } = useParams<IDetailsUrlParams>();
  const { id, name, number, description, images } = useAppSelector(
    getProductDetails
  );

  const resetState = () => {
    dispatch(resetStateAction());
  };

  useEffect(() => {
    dispatch(fetchProductDetailsAction(productId));
    return () => resetState();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('titles.details')}</title>
      </Helmet>
      <ButtonLink to={pageUrls.PRODUCT_EDIT.format({ productId: id })}>
        <Button color="primary" variant="contained">
          {t('common.edit')}
        </Button>
      </ButtonLink>
      <Header>{t('headers.basicData')}</Header>
      <Row>
        <Column>
          <span>{t('labels.name')}</span>
          <p>{name || '-'}</p>
        </Column>
        <Column>
          <span>{t('labels.number')}</span>
          <p>{number || '-'}</p>
        </Column>
      </Row>
      <Row>
        <Column wide>
          <span>{t('labels.description')}</span>
          <p>{description || '-'}</p>
        </Column>
      </Row>
      <Header>
        {t(images.length > 0 ? 'headers.images' : 'headers.noImages')}
      </Header>
      {images.map((image, idx) => (
        <Row key={idx.toString()}>
          <Column>
            <span>{t('labels.imageName')}</span>
            <p>{image.name || '-'}</p>
          </Column>
          <Column>
            <span>{t('labels.imageUrl')}</span>
            <p>{image.url || '-'}</p>
          </Column>
        </Row>
      ))}
    </>
  );
};

export default ProductDetails;

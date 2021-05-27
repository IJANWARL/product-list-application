import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import pageUrls from 'pageUrls';

import { fetchProductListAction, resetStateAction } from './duck/actions';
import { getProductsList } from './duck/selectors';
import { Container, Column, Row } from './styled-components';

const ProductsList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(getProductsList);

  const resetState = () => {
    dispatch(resetStateAction());
  };

  useEffect(() => {
    dispatch(fetchProductListAction());

    return () => resetState();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('titles.list')}</title>
      </Helmet>
      <div>
        <Container>
          <Row header>
            <Column>{t('labels.name')}</Column>
            <Column>{t('labels.number')}</Column>
            <Column>{t('labels.description')}</Column>
          </Row>
          {list.map((el, idx) => (
            <Link
              key={el.id}
              to={pageUrls.PRODUCT_DETAILS.format({ productId: el.id })}
            >
              <Row last={idx === list.length - 1}>
                <Column>{el.name || '-'}</Column>
                <Column>{el.number || '-'}</Column>
                <Column>{el.description || '-'}</Column>
              </Row>
            </Link>
          ))}
        </Container>
      </div>
    </>
  );
};

export default ProductsList;

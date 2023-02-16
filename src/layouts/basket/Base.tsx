import React, { type FC, type ReactElement } from 'react';
import styles from './base.module.scss';
import BasketCard from '@components/cards/basket';
import FlatButton from '@_atoms/buttons/flat-button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { IProduct } from '@_types/index';
import { actions } from '@store/basket';
import { addFavoriteItem } from '@store/favorites';

const Basket: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cart = useSelector((state: RootState) => state.basket);
  return (
    <div className={styles.basket}>
      <div className={styles.basket__box}>
        {cart.items.map((item: IProduct) => (
          <BasketCard
            item={item}
            decrement={function (): void {
              dispatch(actions.updateBasketItemCount({ product: item, num: -1 }));
            }}
            increment={function (): void {
              dispatch(actions.updateBasketItemCount({ product: item, num: 1 }));
            }}
            deleteItem={function (): void {
              dispatch(actions.deleteBasket({ product: item }));
            }}
            addFavorite={function (): void {
              dispatch(addFavoriteItem({ product: item }));
            }}
          />
        ))}
      </div>
      <div className={styles.basket__box}>
        <div className={styles.basket__box__wrapper}>
          <div className={styles.basket__card_box}>
            <div className={styles.basket__box__title}>{t('order_samuray')}</div>
            <div className={styles.basket__box__content}>
              <div className={styles.basket__box__content__price}>
                <div className={styles.basket__box__content__price__title}>{t('subtotal')}</div>
                <div className={styles.basket__box__content__price__value}>{cart.total}</div>
              </div>
            </div>
          </div>
          <FlatButton
            size="lg"
            type="button"
            title={t('confirm_order') as string}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Basket;

import type { FC, ReactNode } from 'react';
import Modal from '@/components/modal';
import styles from './mobile-menu.module.scss';
import Logo from '@_atoms/logo';
import Switch from '@_atoms/form/toggle-switch';
import SelectBox from '@_atoms/form/select';
import { ILanguage } from '@/types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import CircleIconButton from '@components/_atoms/buttons/circle-icon-button';
import { AiFillHeart } from 'react-icons/ai';
import { SlBasket } from 'react-icons/sl';
import { useStore } from '@hooks/useStore'

interface INavbarModalProps {
  onClick: (path: string) => void;
  isShow?: boolean;
  icon: ReactNode;
}

interface IMobileMenuProps {
  onClick: (path: string) => void;
  backgroundClick?: () => void;
}

const MobileMenu: FC<IMobileMenuProps> = ({
  onClick,
  backgroundClick = () => { },
}) => {
  const { t } = useTranslation();
  const { favoritesLength, basketLength } = useStore();
  return (
    <>
      <li className={`${styles.container__mobile_list__item} ${styles.container__mobile_list__item__only_mobile}`}>
        <CircleIconButton
          quanttiy={favoritesLength}
          size={'auto'}
          title={t('navbar.favorites') as string}
          onClick={() => {
            backgroundClick();
            onClick('/favorites');
          }}
          icon={<AiFillHeart />}
        />
      </li>
      <li className={`${styles.container__mobile_list__item} ${styles.container__mobile_list__item__only_mobile}`}>
        <CircleIconButton
          title={t('navbar.cart') as string}
          size={'auto'}
          quanttiy={basketLength}
          onClick={() => {
            backgroundClick();
            onClick('/cart');
          }}
          icon={<SlBasket />}
        />
      </li>
    </>
  );
};

const NavbarModal: FC<INavbarModalProps> = ({ onClick, isShow = false, icon }) => {
  const { t, i18n } = useTranslation();
  const backgroundClick = (): void => {
    const element = document.querySelector('#modal_header button') as HTMLDivElement;
    element.click();
  };
  const language_list = [
    { id: 1, name: t('slect_language.turkish') as string, base: 'tr' },
    { id: 2, name: t('slect_language.english') as string, base: 'en' },
  ]
  const onChangeLanguage = (lang: ILanguage) => {
    i18n.changeLanguage(lang.base);
  }
  const [isDarkMode, setTheme] = useTheme();
  const theme = !isDarkMode ? t('light') : t('dark');
  return (
    <Modal icon={icon} title={t('navbar.title') as string}>
      <div className={styles.container}>
        <ul className={styles.container__mobile_list}>
          <li className={styles.container__mobile_list__item}>
            <span
              onClick={() => {
                backgroundClick();
                onClick('/');
              }}
            >
              <Logo size={'md'} />
            </span>
          </li>
          {isShow && <MobileMenu onClick={onClick} backgroundClick={backgroundClick} />}
          <li className={styles.container__mobile_list__item}>
            <div className={styles.container__mobile_list__item__inner}>
              <span className={styles.container__mobile_list__item__inner__info_msg}>{t('theme_info', { value: theme })}</span>
              <Switch size={'sm'} onClick={setTheme} cstate={isDarkMode} />
            </div>
          </li>
          <li className={styles.container__mobile_list__item}>
            <SelectBox
              placeholder={t('slect_language.language') as string}
              options={language_list}
              value={language_list[t('lng_id') as unknown as number]}
              onClick={(item) => {
                onChangeLanguage(item as ILanguage)
              }}
              size={'auto'}
            />
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default NavbarModal;

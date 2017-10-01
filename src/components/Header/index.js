import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FavoritesModal from 'modals/containers/Favorites';

import { TopNav } from './components/TopNav';
import { CatalogDropdown } from './components/CatalogDropdown';
import { PremiumDropdown } from './components/PremiumDropdown';
import { ChoiceDropdown } from './components/ChoiceDropdown';
import { SearchDropdown } from './components/SearchDropdown';

import hamburgerIcon from './assets/hamburger.svg';
import searchIcon from './assets/search.svg';
import viewedIcon from './assets/viewed.svg';
import favoriteIcon from 'assets/imgs/favorite.svg';
import cartIcon from './assets/cart.svg';
import logoImg from 'assets/imgs/logo.svg';
import './styles.scss';


export class Header extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    region: PropTypes.object,
    favorites: PropTypes.array,
    showModal: PropTypes.func,
    showMobileNav: PropTypes.func,
  };
  render() {
    const { className, region, favorites, showModal, showMobileNav } = this.props;
    return <header className={`header ${ className || '' }`}>
      <div className='header__top-nav'>
        <TopNav region={region} showModal={showModal} />
      </div>
      <div className='header__main-nav'>
        <div className='header__main-nav-col'>
          <div href='#' className='header__main-nav-link'>
            <div className='header__main-nav-link-text'>
              Каталог ковров
              <div className='header__main-nav-link-desc'>3 430 дизайна</div>
            </div>
            <div className='header__dropdown'>
              <div className='header__dropdown-inner'>
                <CatalogDropdown />
              </div>
              <div className='header__dropdown-bg' />
            </div>
          </div>
          <div className='header__main-nav-link'>
            <div className='header__main-nav-link-text'>
              Элитные ковры
              <div className='header__main-nav-link-desc'>ручной работы</div>
            </div>
            <div className='header__dropdown'>
              <div className='header__dropdown-inner'>
                <PremiumDropdown />
              </div>
              <div className='header__dropdown-bg' />
            </div>
          </div>
          <Link className='header__main-nav-link _danger'
                to='/catalog/f/actions-discount'>
            Sale
          </Link>
        </div>
        <img src={hamburgerIcon} className='header__main-nav-hamburger'
             onClick={() => showMobileNav()} />
        <Link className='header__logo'
              to='/'>
          <img src={logoImg} className='header__logo-img' />
        </Link>
        <div className='header__main-nav-col'>
          <div className='header__main-nav-link'>
            Как выбрать ковер
            <div className='header__dropdown'>
              <div className='header__dropdown-inner'>
                <ChoiceDropdown />
              </div>
              <div className='header__dropdown-bg' />
            </div>
          </div>
          <div className='header__main-nav-link'>
            <img src={searchIcon} className='header__main-nav-link-icon' />
            Поиск
            <div className='header__dropdown'>
              <div className='header__dropdown-inner'>
                <SearchDropdown />
              </div>
              <div className='header__dropdown-bg' />
            </div>
          </div>
          <a href='#' className='header__main-nav-link header__main-nav-icon'>
            <img src={viewedIcon} className='header__main-nav-link-icon' />
            0
          </a>
          <div className='header__main-nav-link header__main-nav-icon'
               onClick={() => showModal(<FavoritesModal />, 'fs')}>
            <div className='header__main-nav-link-icon'>
              <img src={favoriteIcon} />
              <div className='tooltip header__main-nav-link-tooltip _nowrap'>
                <div className='tooltip__inner'>
                  <div className='tooltip__text'>
                    Понравившиеся ковры
                  </div>
                </div>
              </div>
            </div>
            {favorites.length}
          </div>
          <a href='#' className='header__main-nav-link header__main-nav-icon'>
            <img src={cartIcon} className='header__main-nav-link-icon' />
            0
          </a>
        </div>
      </div>
    </header>;
  }
}

export default Header;
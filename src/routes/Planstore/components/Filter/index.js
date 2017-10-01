import React from 'react';
import PropTypes from 'prop-types';




/*
import arrowIcon from 'assets/imgs/arrow.svg';

import ColorFilterBody from './containers/ColorFilterBody';
import PriceFilterBody from './containers/PriceFilterBody';
import ShopFilterBody from './containers/ShopFilterBody';
import FilterBody from './containers/FilterBody';

import './styles';*/
import FilterElement from './components/FilterBody';


export class Filter extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    openFilterId: PropTypes.string,
    toggleFilterIsOpen: PropTypes.func,
    activeFilters: PropTypes.object,
  }
  render() {
    const {
      filter,
      openFilterId,
      toggleFilterIsOpen,
      activeFilters,
    } = this.props;
    return <div className="box box--filter">
            <div className="box__header">
              <h3>{filter.name}</h3>
            </div>
            <div className="box__body">
              <FilterElement filter={filter} />
            </div>
    </div>;
  }
}

export default Filter;

// <div className={`filter__items ${ filter.id === openFilterId ? '_open' : '' }`}>
//           {filter.id === 'shop' && <div className='filter__region'
//             onClick={() => { showModal(<RegionSelect />); }}>
//             Город:&nbsp;
//             <div className='filter__region-link'>
//               {region && region.name}
//               <div className='filter__region-link-icon' />
//             </div>
//           </div>}
//           {Object.keys(filter.items).map((k) => {
//             const item = filter.items[k];
//             if(item.type === 'checkbox') {
//               return <div className='filter__item' key={`${ filter.id }-${ item.value }`}>
//                 <Checkbox
//                   input={{
//                     name: `${ filter.id }-${ item.value }`,
//                     value: item.value,
//                     onChange: (e) => {
//                       this.handleChecboxChange(e, filter, item);
//                     },
//                     checked: activeFilters[filter.id] ? !!activeFilters[filter.id][item.value] : false,
//                   }}
//                 >{renderHTML(item.text)}</Checkbox>
//               </div>;
//             } else if(item.code === 'color') {
//               return <div className='filter__item' key={`${ filter.id }-${ item.value }`}>
//                 <Checkbox
//                   input={{
//                     name: `${ filter.id }-${ item.value }`,
//                     value: item.value,
//                     onChange: (e) => {
//                       this.handleChecboxChange(e, filter, item);
//                     },
//                     checked: activeFilters[filter.id] ? !!activeFilters[filter.id][item.value] : false,
//                   }}
//                 >{renderHTML(item.text)}</Checkbox>
//               </div>;
//             }
//             return false;
//           })}
//           {filter.id === 'price' && <div className='filter__premium'>
//             <img className='filter__premium-icon' src={premiumIcon} />
//             <div className='filter__premium-text'>
//               Ковры от 300 000 руб. смотрите в «Элитных коврах».
//               <Link className='filter__premium-text-link'
//                 to='/premium-Y'>
//                 Смотреть ›
//               </Link>
//             </div>
//           </div>}
//         </div>
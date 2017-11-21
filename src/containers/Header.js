import { connect } from 'react-redux';

import { actionCreators as modalsActionCreators } from 'redux/reducers/modal';
import { actionCreators as mobileNavActionCreators } from 'redux/reducers/mobileNav';

import { Header } from 'components/Header';


const mapStateToProps = (state) => {
  const regions = state.regions.get('entities').toJS();
  const currentRegionId = state.regions.get('currentId');
  return {
    region: regions.find(region => `${ region.id }` === `${ currentRegionId }`),
    favorites: state.favorites.toJS(),
      user:state.user
  };
};

const mapDispatchToProps = {
  showModal: modalsActionCreators.showModal,
  showMobileNav: mobileNavActionCreators.showMobileNav,
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
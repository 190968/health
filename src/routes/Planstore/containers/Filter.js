import { connect } from 'react-redux';

//import { actionCreators as catalogRouteActionCreators } from '../modules/reducer';
import { Filter } from '../components/Filter';


const mapStateToProps = state => ({
  /*activeFilters: state.catalogRoute.get('activeFilters').toJS(),
  openFilterId: state.catalogRoute.get('openFilterId'),*/
});

const mapDispatchToProps = {
  /*toggleFilterIsOpen: catalogRouteActionCreators.toggleFilterIsOpen,*/
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

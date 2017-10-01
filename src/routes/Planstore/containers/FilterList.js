import { connect } from 'react-redux'
import { FilterList } from '../components/FilterList'

import { setFilters } from '../modules/planstore'


import { gql,graphql } from 'react-apollo';

const QUERY = gql`
    query GET_PLANSTORE_FILTERS {
        planstore {
            filters {
                code, name, fields {type, text,value}
            }
        }
    }
`;

// 1- add queries:
const FilterListWithQuery = graphql(
  QUERY,
  {
    props: ({ ownProps, data }) => {
      if (!data.loading) {
        //console.log(ownProps);
        //console.log(network);
        return {
          filters: data.planstore.filters,
          //modules: data.network.modules,
          loading: data.loading,
          loadPlans() {
            ownProps.loadPlans(2);
          }
          /*increment() {
               ownProps.increment(data.plans['actionplans']);
          },
          doubleAsync() {
               // reset list of plans
              ownProps.increment([]);
          }*/
        }

      } else {
        return {loading: data.loading}
      }
    },
  }
)(FilterList);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  //console.log(state.planstore.get('filters').toJS());

  return {
    // view store:
    //currentView:  state.views.currentView,
    // userAuth:
    filters: state.planstore.get('filters').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  //console.log(1);
  return {
    updateFilters: (value)=>{dispatch(setFilters(value));}
    /*increment: (info) => {dispatch(increment(info))},
    doubleAsync*/
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterListWithQuery);
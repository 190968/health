import { connect } from 'react-redux'
import { FilterList } from '../components/FilterList'

import { setFilters } from '../modules/planstore'


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
        //console.log(data);
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
      plans_number:  state.planstore.get('plans').toJS().length,
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
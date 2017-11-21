import { connect } from 'react-redux'

import PlanbuilderLayout from '../components/PlanbuilderLayout';
import Plan from 'routes/Plan/components/Plan';


import { gql,graphql } from 'react-apollo';

const QUERY = gql`
    query GET_PP_PLAN ($pid: ID, $type: String) {
        plan (pid: $pid, type: $type) {
            ...PlanCardInfo
            builder_steps {
                url
                label
                code
                sub_items {
                    url
                    label
                    code
                }
            }
        }
    }
    ${Plan.fragments.plan}
`;

// 1- add queries:
const PlanbuilderLayoutWithQuery = graphql(
    QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                pid:ownProps.pid,
                type:ownProps.type,
            },
        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                //console.log(ownProps);
                return {
                    plan: data.plan,
                    //modules: data.network.modules,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanbuilderLayout);

export default  PlanbuilderLayoutWithQuery;
/* -----------------------------------------
  Redux
 ------------------------------------------*/
/*
const mapStateToProps = (state) => {

    var activeFilters = state.planstore.get('activeFilters').toJS();
    //console.log(activeFilters);
    var plans = state.planstore.get('plans').toJS();
    var page = state.planstore.get('page')
    //console.log(plans);
    return {
        plan: null,
        pid: 0,
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log(1);
    return {
        //increment: (info) => {dispatch(increment(info))},
        //doubleAsync
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanbuilderLayoutWithQuery);*/
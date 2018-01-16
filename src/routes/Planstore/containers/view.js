import { connect } from 'react-redux'

/*  This is a container components. Notice it does not contain any JSX,
    nor does it import React. This components is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    components - in this case, the counter:   */

import PlanstorPlanLayout from '../components/PlanstorePlanLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Plan from '../../Plan/components/Plan';


const getPlanMutation = gql`
    mutation getPlan($id: ID!, $input:UserPlanInput!){
        getPlan(id:$id, input:$input) {
            id
        }
    }
`;

const CURRENT_PLANSTORE_PLAN = gql`
    query GET_PLANSTORE_PLAN ($id: ID!) {
        plan (id: $id) {
            ...PlanCardInfo,
            description,
            benefits,
            start_date,
            end_date,
            gender,
            elements,
            language,
            categories {
                id,
                name
            },

        }
    }
    ${Plan.fragments.plan}
`;


// 1- add queries:
const PlanstorPlanLayoutWithQuery = graphql(
    CURRENT_PLANSTORE_PLAN,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.match.params.id
            }

        }),
        props: ({ ownProps, data }) => {
            //console.log(ownProps);
            //console.log(CURRENT_PLANSTORE_PLAN);
            if (!data.loading) {
                //console.log(ownProps);

                return {
                    plan: data.plan,
                    //modules: data.network.modules,
                    loading: data.loading,
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
)(PlanstorPlanLayout);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        //id:0,
        //plan: state.plan,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPlan: (props, client) => {
            //dispatch(loginUserRequest({ email }));
            //console.log(props);
            //const{first_name,last_name,birthday,gender,email, password,password_repeat,prefix,phone} = props;
            //console.log(props);
            const {start_date, privacy, end_date_set} = props;
            const startDate = start_date.format("YYYY-MM-DD");
            const endDate = end_date_set ? props.endDate.format("YYYY-MM-DD") : '';
            //var birth = birthday.substring(0,10);
            //console.log(birth);
            const input = {start_date: startDate, privacy:privacy, end_date:endDate};
            client.mutate({
                mutation: getPlanMutation,
                variables: { id: ownProps.match.params.id, input: input}
            }).then(({data}) => {

                const upid = data.getPlan.id;
                ownProps.history.push('/plan/'+upid)
                console.log("----settings----");
                console.log(data);
            })
        },
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanstorPlanLayoutWithQuery);
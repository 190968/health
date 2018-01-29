import { connect } from 'react-redux'


import UserPlanEdit from '../components/UserPlanEdit';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { message } from 'antd';

const USER_PLAN_INFO = gql`
    query GET_USER_PLAN_SETTINGS ($upid: ID!) {
        userPlan (upid: $upid) {
            id
            startDate
            endDate
            privacy
        }
    }
`;


const UserPlanEditWithQuery = graphql(
    USER_PLAN_INFO,
    {
        options: (ownProps) => ({
            variables: {
                upid: ownProps.id
            }

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    info: data.userPlan,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(UserPlanEdit);


const updatePlan = gql`
    mutation userPlanUpdate($upid:ID!, $input: UserPlanInput!) {
       userPlanUpdate(upid:$upid, input:$input)
    }

`;
const withMutationUpdate = graphql(updatePlan,
    {
        props: ({ ownProps, mutate }) => ({
            updatePlan: input => {
                return mutate({
                    variables: {upid: ownProps.info.id, input},
                })
            },
        }),
    }
);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        dateFormat:state.user.dateFormat,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};


export default withMutationUpdate(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPlanEditWithQuery));
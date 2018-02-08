import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Plan from '../../../../Plan/components/Plan';


// Query for grabbing everything for the dashboard items
export const DASH_QUERY = gql`
    query GET_DASH_PLANS ($user_id: ID, $date: Date)  {
        account {
            plans (user_id: $user_id)  {
                ...PlanCardInfo
                upid
                progress
            }
        }
    }
   
    
    ${Plan.fragments.plan}
`;
const TodoListWithQuery = graphql(
    DASH_QUERY,
    {
        //skip: (ownProps) => ownProps.loading,
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plans: data.account.plans,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
        options: (ownProps) => ({
            skip: !ownProps.ready,
            variables: {
                user_id:ownProps.userId,
                date:ownProps.date,
            },
            fetchPolicy:  'cache-only'
        }),
    }
)(TodoList);

export default TodoListWithQuery;
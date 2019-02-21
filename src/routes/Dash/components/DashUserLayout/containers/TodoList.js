import TodoList from '../components/TodoList'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Plan from '../../../../Plan/components/Plan';
import { ifModuleExists } from '../../../../../components/App/app-context';
import { PlanCardFragment } from '../../../../Plan/components/Plan/fragments';


// Query for grabbing everything for the dashboard items
export const DASH_QUERY = gql`
    query GET_DASH_TODO ($user_id: UID!, $status: UserPlanStatusEnum)  {
        user (id:$user_id) {
            id
            plans (status: $status) {
                id
                startDate
                  endDate
                  endsIn
                plan {
                    ...PlanCardInfo
                    progress
                }
            }
        }
        medicationPlan (userId: $user_id) {
                id
        }
        biometricPlan (userId: $user_id) {
                id
        }
    }
   
    
    ${PlanCardFragment}
`;
const TodoListWithQuery = graphql(
    DASH_QUERY,
    {
        props: ({ ownProps, data }) => {

            if (!data.loading) {
                const {user, medicationPlan, biometricPlan} = data;
                const {plans} = user;
                const haveTodo = plans.length > 0 || medicationPlan.id !== null || biometricPlan.id !== null;
                return {
                    plans: plans,
                    haveTodo: haveTodo,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading, plans: [], haveTodo:false}
            }
        },
        options: (ownProps) => ({
            skip: !ownProps.ready,
            variables: {
                user_id:ownProps.userId,
                date:ownProps.date,
                status:'active'
            },
            fetchPolicy:  'cache-only'
        }),
    }
)(TodoList);

export default ifModuleExists('todo')(TodoListWithQuery);
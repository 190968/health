import ActionPlans from '../components/ActionPlans';
import { graphql } from 'react-apollo';
import {USER_PLANS_LIST_QUERY} from "../../../../../../Plan/containers/PlansList";

const withQuery = graphql(
    USER_PLANS_LIST_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user.id,
                status: 'active'
            }
        }),
        props: ({data}) => {
            const {user, refetch} = data;
            const {plans} = user || {};
            const {status} = data.variables || {};
                return {
                    plans: plans,
                    loading: data.loading,
                    status:status,
                    refetch,
                    loadByStatus(status) {
                        return data.refetch({
                          status: status
                        });
                      },
                }
        },
    }
);



export default withQuery(ActionPlans);
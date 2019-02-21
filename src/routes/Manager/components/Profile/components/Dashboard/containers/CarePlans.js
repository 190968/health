import CarePlans from '../components/CarePlans';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanCardFragment} from "../../../../../../Plan/components/Plan/fragments";

export const USER_CAREPLANS_QUERY = gql`    
    query GET_USER_CAREPLANS ($user_id:UID, $type: String, $status:UserPlanStatusEnum)  {
            patient (id:$user_id) {
              id
              getPlans (status: $status, type: $type)  {
                  id
                  plan {
                    ...PlanCardInfo
                  }
                  startDate
                  endDate
                  adherence {
                    level
                    color
                  }
              }
            }
    }
    ${PlanCardFragment}
`;

const withQuery = graphql(
    USER_CAREPLANS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user.id,
                status: 'active',
                type: 'careplan'
            }
        }),
        props: ({data}) => {
            const {patient, refetch} = data;
            const {getPlans=[]} = patient || {};
            const {status} = data.variables || {};

            return {
                plans: getPlans,
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



export default withQuery(CarePlans);
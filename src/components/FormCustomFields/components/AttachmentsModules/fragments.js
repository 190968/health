
import gql from 'graphql-tag';
import { PlanCardFragment } from '../../../../routes/Plan/components/Plan/fragments';

export const SimpleConnectionFragment = gql`
fragment SimpleConnection on SimpleConnection {
    id
    type
    connectionNode {
        ... on Plan {
            ...PlanCardInfo
        }
        ... on Assessment {
            id
            name
        }
    }
    schedule {
        startDate
        endDate
        dows
        startTime
    }
}
${PlanCardFragment}
`;
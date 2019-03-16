import gql from 'graphql-tag';
import { PlanElementPureFragment } from '../../routes/Plan/components/Plan/fragments';

export const PlanFragment = gql`
    fragment Plan on Plan {
        id
        title
        description
        type
        thumb {
            small
            medium
            large
            wide
        }
    }
`;







import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElementPureFragment} from "../../../../../../../../../../../Plan/components/Plan/fragments";

export const TreatmentPlanFragment = gql`
        fragment TreatmentPlanInfo on TreatmentPlan {
            id
            title
            startDate
            endDate
        }
`;

export const TreatmentPlanFullFragment = gql`
        fragment TreatmentPlanFullInfo on TreatmentPlan {
            ...TreatmentPlanInfo
            elements {
                ...PlanElement
            }
        }
        ${TreatmentPlanFragment}
        ${PlanElementPureFragment}
`;

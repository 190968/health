import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../User/fragments';

export const VisitInfoFragment = gql`
fragment VisitInfo on Visit {
    id
    isFollowUp
    visitType
    visitTypeTxt
    dateTime
    patient {
        ...UserInfo
    }
    subjective
    objective
    soapPlan
    soapAssessment
}
${UserInfoFragment}
`;
import VisitsPure from '../components/Visits';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../User/fragments';

const GET_PATIENT_VISITS_QUERY  = gql`
 query GET_PATIENT_VISITS($userId:UID) {
  patient(id: $userId) {
     id
     getVisits {
         edges {
            id
            visitTypeTxt
            dateTime
            subjective
        }
        totalCount
     }
  }
}
`;

const withQuery = graphql(GET_PATIENT_VISITS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                userId:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient, refetch} = data;
        const {getVisits} = patient || {};
        const {edges=[], totalCount} = getVisits || {};

        return {loading: data.loading, visits:edges, total:totalCount, refetch }
    },
});



const enhance = compose(
    withQuery
);

export const PatientVisits = enhance(VisitsPure);
export default PatientVisits;
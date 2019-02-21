import TransitionsPure from '../components/Transitions';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../User/fragments';
import { TransitionInfoFragment } from '../components/Transitions/queries';

const GET_PATIENT_TRANSITIONS_QUERY  = gql`
 query GET_PATIENT_TRANSITIONS($userId:UID) {
  patient(id: $userId) {
     id
     getTransitions {
         edges {
             ...TransitionInfo
        }
        totalCount
     }
  }
}
${TransitionInfoFragment}
${UserInfoFragment}
`;

const withQuery = graphql(GET_PATIENT_TRANSITIONS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                userId:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient, refetch} = data;
        const {getTransitions} = patient || {};
        const {edges=[],totalCount=0} = getTransitions || {};

        return {loading: data.loading, total:totalCount, transitions:edges, refetch }
    },
});



const enhance = compose(
    withQuery
);

export const PatientTransitions = enhance(TransitionsPure);
export default PatientTransitions;
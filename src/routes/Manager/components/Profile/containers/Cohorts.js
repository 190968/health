import Cohorts from '../components/Cohorts';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";

const GET_PROVIDERS_QUERY  = gql`
 query GET_USER_QUAL_MEASURES($userId:UID) {
  patient(id: $userId) {
     id
     getCohorts {
         edges {
            id
            cohort {
                id
                title
                codes {
                    id
                    code
                }
            }
            startDate
        }
     }
  }
}

`;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                userId:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {getCohorts={}} = patient;
        const {edges=[]} = getCohorts;

        return {loading: data.loading, cohorts:edges }
    },
});



const enhance = compose(
    withQuery
);

export const PatientCohorts = enhance(Cohorts);
export default PatientCohorts;
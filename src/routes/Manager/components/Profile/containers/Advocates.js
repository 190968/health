import Advocates from '../components/Advocates';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";
import { withTableCursors } from '../../../../../components/Tables/hocs';
import { AdvocateFragment } from '../components/Advocates/fragments';

export const GET_ADVOCATES_QUERY  = gql`
 query GET_USER_ADVOCATES($user_id:UID, $status: String) {
  patient(id: $user_id) {
     id
     motivation {
        getAdvocates (status: $status) {
            totalCount,
            edges {
                ...Advocate
            }
        }
     }
  }
}

${AdvocateFragment}
`;

const withQuery = graphql(GET_ADVOCATES_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            },
            fetchPolicy: 'network_only',
        }
    },
    props: ({ data }) => {

        const {motivation} = data.patient || {};
        const {getAdvocates} = motivation || {};
        const {edges=[]} = getAdvocates || {};
        const {status} = data.variables || {};

        return {loading: data.loading, status, users:edges, refetch:data.refetch, 
            loadByStatus(status) {
                return data.refetch({status});
            } 
        }
    },
});



const enhance = compose(
    withQuery,
    withTableCursors
);

export const PatientAdvocates = enhance(Advocates);
export default PatientAdvocates;
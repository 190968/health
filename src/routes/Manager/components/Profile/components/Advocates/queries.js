
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { AdvocateFragment } from './fragments';




 

export const FAMILY_MEMBER_QUERY = gql`
    query QUALITY_MEASURE ($id: UID!, $userId: UID! ) {
        patient (id: $userId) {
            id
            motivation {
                getFamilyMember(id:$id) {
                    ...Advocate
                }
            }
        }
    }
    ${AdvocateFragment}
`;

export const withAdvocateQuery = graphql(FAMILY_MEMBER_QUERY, {
        options: (ownProps) => {
            const {familyMember, user} = ownProps;
            const {id} = familyMember || {};
            const {id:userId} = user || {};
            return {
                variables: {
                    id,
                    userId
                }
            }
        },
        props: ({ ownProps, data }) => {
            console.log(data);
            const {motivation} = data.patient || {};
            const {getFamilyMember} = motivation || {};
            return {...ownProps, loading: data.loading, familyMember:getFamilyMember}
        },
    }
);


import PatientFamilyMemberSelectPure from '../components/PatientTeamMembersSelect';
import { graphql } from 'react-apollo';
import { UserInfoFragment } from '../../../routes/User/fragments';
import gql from 'graphql-tag';
 

export const PATIENT_FAMILY_QUERY  = gql`
   query GET_FAMILY {
        account {
            user {
                id
                motivation{
                    family {
                        totalCount,
                        edges{
                            id,
                            user {
                                ...UserInfo
                            }
                        }
                    }
                }
            }
         }
     }
     ${UserInfoFragment}
`;
 

export const withPatientFamilySearchQuery = graphql(PATIENT_FAMILY_QUERY,
    {
        options: (ownProps) => {
            const {user} = ownProps;
            const {id:userId} = user || {};
            return {
                variables: {
                    userId
                },
                fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            const {patient} = data;
            const {motivation} = patient || {};
            const {family} = motivation || {};
            const {edges} = family || {};
            return {
                items: edges,
                loading: data.loading,
            
                doSearch(search) {
                    return data.refetch({search: search});
                }
            }
        },

    }
);



export const PatientFamilyMemberSelect = withPatientFamilySearchQuery(PatientFamilyMemberSelectPure);
export default PatientFamilyMemberSelect;

 
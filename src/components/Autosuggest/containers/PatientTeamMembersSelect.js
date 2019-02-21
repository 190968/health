import PatientTeamMembersSelectPure from '../components/PatientTeamMembersSelect';
import { graphql } from 'react-apollo';

import { PATIENT_TEAM_MEMBERS_QUERY } from '../components/TeamSelect/containers/TeamMembersList';
 

export const withPatientTeamSearchQuery = graphql(PATIENT_TEAM_MEMBERS_QUERY,
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
            const {careTeam} = motivation || {};
            const {edges} = careTeam || {};
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



export const PatientTeamMembersSelect = withPatientTeamSearchQuery(PatientTeamMembersSelectPure);
export default PatientTeamMembersSelect;

 
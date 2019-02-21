import Programs from "../components/Programs";
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_PATIENT_PROGRAMS_QUERY } from "../components/Programs/queries";


export const withPatientProgramsQuery = graphql(GET_PATIENT_PROGRAMS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id,
                status: 'active',
            }
        }
    },
    props: ({ data }) => {

        const {patient} = data;
        const {getPrograms} = patient || {};
        const {edges=[], totalCount=0} = getPrograms || {};
        const {status} = data.variables || {};
        return {loading: data.loading, programs:edges, total: totalCount, status,
            loadByStatus(status) {
                return data.refetch({
                    status: status
                });
            }
        }
    },
});




const enhance = compose(
    withPatientProgramsQuery
);

export const UserPrograms = enhance(Programs);
export default UserPrograms
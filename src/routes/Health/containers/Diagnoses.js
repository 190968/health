import DiagnosesPure from '../components/Diagnoses';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {HealthElementFragment} from "../components/fragments";

export const GET_USER_DIAGNOSES_QUERY = gql`
    query GET_USER_DIAGNOSES ($userId: UID!, $isFamily: Boolean) {
        patient (id: $userId) {
            id
            healthRecords (type: "diagnosis", isFamily: $isFamily) {
                totalCount
                edges {
                    ...HealthElement
                }
            }
            
        }
    }
    ${HealthElementFragment}
`;

const DiagnosesWithQuery = graphql(
    GET_USER_DIAGNOSES_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.user.id,
                isFamily: ownProps.isFamily
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                //console.log(data);
                return {
                    diagnoses: data.patient.healthRecords.edges,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)(DiagnosesPure);

export const DiagnosesList = DiagnosesWithQuery;
export default DiagnosesList;

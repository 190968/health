import ProcedureSelectPure from '../components/ProcedureSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const GET_PROCEDURES_LIST_QUERY = gql`
    query GET_PROCEDURES_LIST ($search: String)  {
        health {
            getProceduresList (search: $search) {
                id
                hcpc
                name
            }
        }
    }
`;

const ProcedureSelectWithQuery = graphql(GET_PROCEDURES_LIST_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.health.getProceduresList,
                    loading: data.loading,

                    doSearch(search) {
                        return data.refetch({
                            search: search,
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)(ProcedureSelectPure);

export default ProcedureSelectWithQuery;

export const ProcedureSelect = ProcedureSelectWithQuery;
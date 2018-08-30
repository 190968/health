import FamilyHistory from '../components/FamilyHistory';
import { graphql } from 'react-apollo';
import {GET_USER_HEALTH_ITEMS_QUERY} from "../../../../../../Health/queries";


const withQuery = graphql(
    GET_USER_HEALTH_ITEMS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.user.id,
                type: 'diagnosis',
                isFamily: true,
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                return {
                    items: data.patient.healthRecords.edges,
                    total: data.patient.healthRecords.totalCount,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(FamilyHistory);
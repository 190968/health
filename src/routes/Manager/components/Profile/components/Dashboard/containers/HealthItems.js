import HealthItems from '../components/HealthItems';
import { graphql } from 'react-apollo';
import {GET_USER_HEALTH_ITEMS_QUERY} from "../../../../../../Health/queries";

const withQuery = graphql(
    GET_USER_HEALTH_ITEMS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.user.id,
                type: ownProps.type,
                isFamily: ownProps.isFamily
            }
        }),
        props: ({data}) => {
            const {patient, refetch} = data;
            const {healthRecords} = patient || {};
            const {edges, totalCount} = healthRecords || {};
            return {
                items: edges,
                total: totalCount,
                loading: data.loading,
                refetch
            }
        },
    }
);



export default withQuery(HealthItems);

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
// import {branch, compose} from 'recompose';
import { PathwayCardFragment } from '../../routes/Plan/components/Plan/fragments';

const GET_PATHWAY_MAIN_QUERY = gql`    
    query GET_PATHWAY($id: UID!) {
        getPathway (id: $id) {
            ...PathwayCardInfo
        }
    }
    ${PathwayCardFragment}
`;

export const withPathwayMainQuery = graphql(
    GET_PATHWAY_MAIN_QUERY,
    {
        skip: (props) =>  {
            const {id} = props.plan || {};
            return !id;
        },
        options: (ownProps) => {
            const {plan} = ownProps;
            const {id} = plan || {};
            return {
                variables: {
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getPathway} = data || {};
            return {
                plan: getPathway,
                loading: data.loading,
            }
        },
    }
);

import NetworkProgramCategorySelectPure from '../components/NetworkProgramCategorySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_NETWORK_PRORGRAM_CATEGORIES_QUERY = gql`
 query GET_NETWORK_PRORGRAM_CATEGORIES  {
    management {
        getProgramCategories {
            id
            name
            getSubCategories {
                id
                name
            }
        }
    }
}
`;



const withQuery = graphql(GET_NETWORK_PRORGRAM_CATEGORIES_QUERY,
    {
        // options: () => {
        //     return {
        //         //fetchPolicy: 'network-only'
        //     }
        // },
        props: ({ data }) => {
            const {management} = data;
            const {getProgramCategories=[]} = management || {};

            const items = getProgramCategories.map(c => {
                const {id, name, getSubCategories} = c || {};
                return {value:id, label:name, children: getSubCategories.map(s => {
                    const {id, name} = s || {};
                    return {value:id, label:name};
                })
                }
            })
            return {
                items ,
                loading: data.loading,
            }
        },

    }
);




export const NetworkProgramCategorySelect = withQuery(NetworkProgramCategorySelectPure);

export const prepareNetworkProgramCategoryForForm = category => {
    const {id, getSubCategories=[]} = category || {};
    const {id:subId} = getSubCategories[0] || {};
    return [id, subId];
    //return {value:[id, subId]};
}
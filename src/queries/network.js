import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_NETWORK_QUERY = gql`
    query GET_CURRENT_USER  {
        account   {
            network {
                id,
                name,
                description,
                logo,
                modules {
                    id,
                    name,
                    placeholder
                }
                allowSignUp
                colors {
                    primary
                    brand
                    headerBg
                    headerText
                    footerBg
                    footerText
                }
                labels {
                    key
                    label
                }
            }
        }
    }
`;

export const withCurrentNetwork = graphql(CURRENT_NETWORK_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-only'
            }
        },
        props: ({ data }) => {
            const {account={}} = data;
            const {network} = account;
            return {activeNetwork:network}
        }
    }
)
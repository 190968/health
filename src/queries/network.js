import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



export const CurrentNetworkInfoFragment = gql`
       fragment CurrentNetworkInfo on Account {
            currentNetwork {
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
`;


const CURRENT_NETWORK_QUERY = gql`
    query GET_CURRENT_USER  {
        account   {
            ...CurrentNetworkInfo
        }
    }
    ${CurrentNetworkInfoFragment}
`;

export const withCurrentNetwork = graphql(CURRENT_NETWORK_QUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ownProps, data }) => {
            const {loading:ownLoading} = ownProps;
            const {account={}, loading=ownLoading} = data;
            const {currentNetwork={}} = account;
            
            //console.log(network);
            return {currentNetwork, loading}
        }
    }
)
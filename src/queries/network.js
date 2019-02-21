import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withActiveNetwork } from '../components/App/app-context';



export const NetworkInfoFragment = gql`
       fragment NetworkInfo on Network {
                id,
                name,
                description,
                logo,
                modules {
                    id
                    name
                    placeholder
                    settings {
                        key
                        value
                    }
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

                getNetworkAdherence {
                    med
                    high
                    highColor
                    medColor
                    lowColor
                }
        }
`;

export const ProviderInfoFragment = gql`
    fragment ProviderInfo on Provider {
        id
        name
        logo
    }
`;


export const CurrentNetworkInfoFragment = gql`
       fragment CurrentNetworkInfo on Account {
            currentNetwork {
                id,
                name,
                description,
                logo,
                modules {
                    id
                    name
                    placeholder
                    settings {
                        key
                        value
                    }
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

                getNetworkAdherence {
                    med
                    high
                    highColor
                    medColor
                    lowColor
                }
            }
            currentProvider {
                id
                name
                logo
            }
        }
`;


const CURRENT_NETWORK_QUERY = gql`
    query GET_CURRENT_NETWORK  {
        account   {
            ...CurrentNetworkInfo
        }
    }
    ${CurrentNetworkInfoFragment}
`;
export const withCurrentNetwork = withActiveNetwork;
export const withCurrentNetwork2 = graphql(CURRENT_NETWORK_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-only'
            }
        },
        props: ({ownProps, data }) => {
            const {loading:ownLoading} = ownProps;
            const {account={}, loading=ownLoading} = data;
            const {currentNetwork={}} = account;
            
            //console.log(network);
            return {currentNetwork}
        }
    }
)
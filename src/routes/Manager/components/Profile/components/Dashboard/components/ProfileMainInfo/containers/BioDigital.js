import BioDigitalPure from '../components/BioDigital';
import { compose, withProps } from 'recompose';
import { withModal } from '../../../../../../../../../components/Modal';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';



export const GET_BIODIGITAL_ITEMS_QUERY = gql`
    query GET_BIODIGITAL_ITEMS {
        management {
            getBiodigitalItems {
                title
                url
                thumbnailUrl
            }
        }
    }

`;

const withQuery = graphql(
    GET_BIODIGITAL_ITEMS_QUERY,
    {
        options: (ownProps) => {
            return {
                // variables: {
                //     userId: ownProps.user.id,
                // }
            }
        },
        props: ({data}) => {
            const {getBiodigitalItems=[]} = data.management || {};
                return {
                    items: getBiodigitalItems,
                    refetch: data.refetch,
                    loading: data.loading,
                }
        },
    }
);

const enhance = compose(
    withQuery,
    withProps(props => {
        return {
            modalFooter:false,
            modalWidth: 800
        }
    }),
    withModal
);
export const BioDigital = enhance(BioDigitalPure);
import Calculators from '../components/Calculators';
import {compose, withProps} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withModal } from '../../../../../components/Modal';
import { EvidencioCalculatorFragment } from '../components/Calculators/fragments';

const GET_CALCULATORS_QUERY  = gql`
 query GET_CALCULATORS  {
    health {
    getEvidencioCalculators {
      ...EvidencioCalculatorInfo
    }
  }
}
${EvidencioCalculatorFragment}

`;

const withQuery = graphql(GET_CALCULATORS_QUERY, {
    options: (ownProps) => {
        console.log(11111);
        return{
            variables: {
               // user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {health} = data;
        const {getEvidencioCalculators=[]} = health || {};

        return {loading: data.loading, calculators:getEvidencioCalculators }
    },
});



const enhance = compose(
    withQuery,
    withProps(props => {
        return {
            modalTitle: 'Calculators',
            modalFooter: 'ok',
            modalWidth: 800
        };
    }),
    withModal,
);

export default enhance(Calculators);
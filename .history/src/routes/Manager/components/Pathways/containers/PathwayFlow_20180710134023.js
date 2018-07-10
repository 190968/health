import PathwayFlow from  '../components/PathwayFlow';
import {compose, withProps} from 'recompose';
import { withModal } from '../../../../../components/Modal';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { PlanElementPureFragment } from '../../../../Plan/components/Plan/fragments';

const GET_PATHWAY_FLOW_QUERY  = gql`
 query GET_PATHWAY_FLOW ($id: UID!) {
  getPathway (id:$id) {
    id
    elements {
        ...PlanElement
    }
  }
}
${PlanElementPureFragment}
`;

const withQuery = graphql(GET_PATHWAY_FLOW_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                id: ownProps.pathway.id,
            },
        }
    },
    props: ({ownProps:{pathway={}} data }) => {
        
        const {getPathway:pathway, loading} = data;
        if (!data.loading) {
            return {
                pathway: data.getPathway,
                loading: data.loading
            }
        }
        else {
            
        }
        return {loading, pathway:getPathway }
    },
});

const enhance = compose(
    withQuery,
    withProps(props => {
        return {
            modalTitle: 'View Flow'
        }
    }),
    withModal
)


export default enhance(PathwayFlow);
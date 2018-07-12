import PathwayFlow from  '../components/PathwayFlow';
import {compose, withProps, withHandlers, withState} from 'recompose';
import { withModal, withSpinnerWhileLoading } from '../../../../../components/Modal';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { PlanElementPureFragment } from '../../../../Plan/components/Plan/fragments';
import { PLAN_ELEMENT_CHILDREN_QUERY } from '../../../../Plan/components/PlanLayout/components/PlanElement/containers/queries';
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

let queryOptions = {
    query: PLAN_ELEMENT_CHILDREN_QUERY,
    fetchPolicy: 'network_only',
}

const withQuery = graphql(GET_PATHWAY_FLOW_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                id: ownProps.pathway.id,
            },
        }
    },
    props: ({ownProps:{pathway={}}, data }) => {
        const {getPathway={}, loading} = data;
        return {loading, pathway:{...pathway, ...getPathway} }
    },
});

const enhance = compose(
    withQuery,
    withProps(props => {
        console.log(props);
        return {
            modalTitle: 'View '+props.pathway.title+' Flow',
            modalWidth: 700
        }
    }),
    withModal,
    withApollo,
    withSpinnerWhileLoading,

    withState('elements', 'setElements', props => props.pathway.elements || []),
    withState('elementsByElements', 'setElementsByElements', {}),
    withHandlers({
        loadChildren: props => (id, elementValue) => {
            console.log(id);
            console.log(elementValue);
            queryOptions.variables = {id, planId:props.pathway.id,elementValue:elementValue}
            props.client.query(queryOptions)
                    .then(({data}) => {
                        console.log(data);
                        const {planElement={}} = data;
                        const {childrenElements=[]} = planElement;
                        let elementsByElements = props.elementsByElements;
                        console.log(elementsByElements);
                        if (!elementsByElements[id]) {
                            elementsByElements[id] = {}; 
                        }
                        if (!elementsByElements[id][elementValue]) {
                            elementsByElements[id][elementValue] = []; 
                        }
                        elementsByElements[id][elementValue] = childrenElements;
                        //console.log(elementsByElements);
                        //elementsByElements = childrenElements;//...elementsByElements, childrenElements];
                        //console.log(elementsByElements);
                        props.setElementsByElements(elementsByElements);

                        // append children elements
                        //const {getCancerStage = {}} = data;
                        //props.selectStage(getCancerStage);
                    });
        }
    })
)


export default enhance(PathwayFlow);
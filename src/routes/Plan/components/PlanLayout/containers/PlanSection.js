import PlanSection from '../components/PlanSection'
import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
import {branch, compose, withHandlers, withProps, withState} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withUpdateOrderMutation} from "../components/PathwayBody/index";


const reportOnSection_MUTATION = gql`
    mutation sectionReport($id: UID!, $upid: UID! $date: Date!) {
        sectionComplete(id:$id, upid:$upid, date:$date) {
             id
             completed(date:$date, upid:$upid)
        }
    }
`;

const withMutation = graphql(reportOnSection_MUTATION, {
    props: ({ mutate, ownProps }) => ({
        sectionReport: (id) => {

            const {date, upid} = ownProps;
            return mutate({
                variables: {upid:upid, id: id, date:date },
            });
        },

    }),
});


/**
 * Enhance Body
 */
const builderEnhance = compose(
    withState('elements2', 'setElements', null),
    withProps(props => {
        let propsUpdated = {
            mode:'section'
        };
        if (props.isBuilderMode && !props.isPreviewMode) {
            propsUpdated = {...propsUpdated, ...{
                useDragHandle: true,
                lockAxis: 'y',
                onSortEnd: props.onSortEnd,
                useWindowAsScrollContainer: true
            }}
        }

        const {elements2=null} = props;
        const {item={}} = props;
        const {elements=[]} = item;

        propsUpdated.elements = elements2 ? elements2 : elements;

        return propsUpdated;
    }),

    withUpdateOrderMutation,
    //branch(props => props.isBuilderMode, withUpdateOrderMutation),
    withHandlers({
        updateOrder: props => elements => {
            const ids = elements.map(element => element.id);
            props.updateElementsOrder(ids, elements);
        }
    }),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            const newElements = arrayMove(props.elements, oldIndex, newIndex);
            props.updateOrder(newElements);
        }
    }),
    SortableContainer,
);

const enhance = compose(
    withMutation,
    branch(props => props.isBuilderMode, builderEnhance),
    withProps(props => {
        const {item={}} = props;
        const {elements=[]} = item;
        return {
            elements: elements
        }
    })
)


export default enhance(PlanSection);

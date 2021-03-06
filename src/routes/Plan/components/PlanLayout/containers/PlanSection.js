import PlanSection from '../components/PlanSection'
// import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
// import {branch, compose, withHandlers, withProps, withState} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_PATIENT_POINTS_QUERY } from '../../../../../layouts/components/Header/components/RightMenu/containers/HeaderPoints';
// import { withUpdatePlanElementsOrderMutation } from '../../../../../components/Plan/components/Builder/mutations';
// import { withPlanElementsSelectorEnhancer } from '../../../../../components/Plan/components/Body/containers/ElementsList';


const reportOnSection_MUTATION = gql`
    mutation sectionReport($id: UID!, $upid: UID! $date: Date!) {
        sectionComplete(id:$id, upid:$upid, date:$date) {
             id
             completed(date:$date, upid:$upid) @connection(key: "planActivitiesCompletion", filter: ["date", "upid"]) 
        }
    }
`;

const withMutation = graphql(reportOnSection_MUTATION, {
    props: ({ mutate, ownProps }) => ({
        sectionReport: (id) => {

            // console.log(ownProps, 'ownProps');
            // return;
            const {date, upid, item} = ownProps;
            const {completed} = item || {};
            let refetchQueries = [];
            const {user} = ownProps;
            if (user) {
                refetchQueries.push({
                    query: GET_PATIENT_POINTS_QUERY,
                    variables: {
                        userId: ownProps.user.id,
                    }
                });
            }
            return mutate({
                variables: {upid:upid, id: id, date:date },
                // refetchQueries
                // refetchQueries: [{
                //     query: GET_PATIENT_POINTS_QUERY,
                //     variables: {
                //         userId: userId,
                //     }
                // }]
            });
        },

    }),
});


// /**
//  * Enhance Body
//  */
// const builderEnhance = compose(
//     // withState('elements', 'setElements', props => {
//     //     const {elements=[]} = props;
//     //     return elements;
//     // }),
//     withProps(props => {
//         let propsUpdated = {
//             mode:'section'
//         };
//         if (props.isBuilderMode && !props.isPreviewMode) {
//             propsUpdated = {...propsUpdated, ...{
//                 useDragHandle: true,
//                 lockAxis: 'y',
//                 onSortEnd: props.onSortEnd,
//                 useWindowAsScrollContainer: true
//             }}
//         }
//         return propsUpdated;
//     }),

//     withUpdatePlanElementsOrderMutation,
//     //branch(props => props.isBuilderMode, withUpdateOrderMutation),
//     withHandlers({
//         updateOrder: props => elements => {
//             const ids = elements.map(element => element.id);
//             props.updateElementsOrder(ids, elements);
//         }
//     }),
//     withHandlers({
//         onSortEnd: props => ({oldIndex, newIndex}) => {
//             const newElements = arrayMove(props.elements, oldIndex, newIndex);
//             props.updateOrder(newElements);
//         }
//     }),
//     SortableContainer,
// );

// const enhance = compose(
//     withMutation,
//     // branch(props => props.isBuilderMode && !props.isPreviewMode, builderEnhance),
//     // withPlanElementsSelectorEnhancer,
//     // withProps(props => {
//     //     const {item={}} = props;
//     //     const {elements=[]} = item;
//     //     return {
//     //         elements: elements
//     //     }
//     // })
// )


export default withMutation(PlanSection);

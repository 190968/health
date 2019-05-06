import List from '../components/ElementsList';
import {compose, branch, withStateHandlers} from 'recompose';
import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
import { PlanElementsListBuilderEnhancer } from '../../Builder/containers/ElementsList';
 
export const withPlanElementsSelectorEnhancer = withStateHandlers(props => {
    const {elements=[]} = props;
    const elementsLength = elements ? elements.length-1 : -1;
    // console.log(elementsLength);
    return {currentInOrder:elementsLength}
}, {
    updateCurrentElement: props => i => {
        return {
            currentInOrder:i
        }
    },
    increaseCurrentElement: props => () => {
        const {currentInOrder} = props;
        return {
            currentInOrder:currentInOrder+1
        }
    },
    decreaseCurrentElement: props => () => {
        const {currentInOrder} = props;
        return {
            currentInOrder:currentInOrder-1
        }
    }
});

const enhance = compose(
    branch(props => props.isBuilderMode, PlanElementsListBuilderEnhancer),
    withPlanElementsSelectorEnhancer
);
export const PlanElementsList = enhance(List);
import List from '../components/ElementsList';
import {compose, branch, withStateHandlers} from 'recompose';
import { PlanElementsListBuilderEnhancer } from '../../Builder/containers/ElementsList';
import { checkIfPlanElementIsInput } from '../../../utils';
import { withSpinnerWhileLoading } from '../../../../Modal';
 
export const withPlanElementsSelectorEnhancer = withStateHandlers(props => {
    const {elements=[], isBuilderMode, isPreviewMode} = props;
    // console.log(elements);
    // console.log(props);
    let newIndex = isBuilderMode && !isPreviewMode ? null : 0;
    console.log(newIndex, 'new');
    // const elementsLength = 0;//elements ? elements.length-1 : -1;
    if (!isBuilderMode || isPreviewMode) {
        newIndex = elements.findIndex((el, elI) => {
                // element should be after the current one
                const isInput = checkIfPlanElementIsInput({element:el, includeAlias:true});
                return isInput;
        });
        console.log(newIndex, 'newIndex');
        if (parseInt(newIndex) < 0) {
             console.log(newIndex, 'newIndex21');
            newIndex = 0;
        }
        console.log(newIndex, 'newIndex2');
    } else {
        if (elements && elements.length > 0) {
            newIndex =  elements.length-1;
            console.log(newIndex, 'newIndex11111');
        }
        console.log(newIndex, 'oooops');
    }
    

    console.log(newIndex, 'newIndex');
    return {currentInOrder:newIndex}
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
    withSpinnerWhileLoading,
    withPlanElementsSelectorEnhancer
);
export const PlanElementsList = enhance(List);
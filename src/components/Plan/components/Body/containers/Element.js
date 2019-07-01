import Element from '../components/Element';
import {compose, branch, withHandlers} from 'recompose';
import {SortableElement} from 'react-sortable-hoc';
import { PlanElementBuilderEnhancer } from '../../Builder/containers/Element';
import { checkIfPlanElementIsInput } from '../../../utils';
import { PlanElementDraggableEnhancer } from '../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementChildrenList/containers/PlanElementChildrenElement';


const enhance = compose(
    branch(props => props.isBuilderMode, PlanElementBuilderEnhancer),
    withHandlers({
        setNextElementInOrder: props => () => {
            const {i, elements} = props;
            const elementsLength = elements.length;
            console.log(props);
            // find the next input element
            let newIndex = elements.findIndex((el, elI) => {
                if (i < elI) {
                    // element should be after the current one
                    const isInput = checkIfPlanElementIsInput({element:el});
                    return isInput;
                }
                return false;
            });
            // if we don't have any input element, just show the next one
            if (newIndex < 0) {
                if (elementsLength-1 > i) {
                    newIndex = i+1;
                }
            }
            // console.log(newIndex, 'newIndex');
            props.updateCurrentElement(newIndex);
        }
    }),
    branch(props => props.isDraggable, PlanElementDraggableEnhancer),
);
export const PlanElement = enhance(Element);
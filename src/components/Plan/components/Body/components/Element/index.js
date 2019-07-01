import React from 'react'
import {List, Button, Divider} from 'antd';
import { PlanElement } from '../../../../../../routes/Plan/components/PlanLayout/components/PlanElement';
import { checkIfPlanElementIsInput, canUsePlanElementNextButton } from '../../../../utils';

const PlanElementItem = (props) => {
    const {element, isBuilderMode, plan, currentInOrder, i, elements, parentElement} = props;
    let {showByElement=false} = plan || {};
    console.log(props, 'props For element');
    const elementsLength = elements ? elements.length : 0;
    const isCurrent = currentInOrder === i;
    const isFirst = currentInOrder === 0 && i===0;
    const isLast = i === elementsLength-1;
    const isPast = isFirst || currentInOrder >= i;
    let showNextButton = false;
    
    // !isFirst && !isLast;
    // console.log(currentInOrder, i);
    // console.log(isPast, 'isPast');
    // if we show by element, then we should check if it's past or future and if we should show the current elment
    if (showByElement) {
        if (!parentElement) {
            const isInputType = checkIfPlanElementIsInput({element});
            if (isInputType) {
                showNextButton = canUsePlanElementNextButton();
                
            } else {
                // showNextButton = canUsePlanElementNextButton();
            }
            // if it's not input field - show always it
            // if (isInputType) {
                // console.log(currentInOrder, 'currentInOrder');
                // console.log(i, 'i');
                
            
            // }
            if (!isPast) {
                return null;
            }
        }
       
    }
    const isDisabled = isPast && !isCurrent;
    // do not show the button for the last element
    if (isLast || isDisabled) {
        showNextButton = false;
    }
    // showNextButton = true;
    //console.log(props, 'plan element item props');
    // check if  we need to render this item

    return <List.Item>
    <PlanElement {...props} />
    {(showByElement && showNextButton ) && <Divider orientation={'right'} style={{textAlign:'right'}} ><Button disabled={isDisabled} type={'primary'} onClick={props.setNextElementInOrder}>Next</Button></Divider>}
</List.Item>;
}


export default PlanElementItem;

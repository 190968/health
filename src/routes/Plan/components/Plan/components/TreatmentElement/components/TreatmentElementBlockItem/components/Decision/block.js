import React from 'react';
import Decision from './index';
import PlanElementChildrenList from '../../../../../../../../../../components/PlanLayout/components/PlanElement/containers/PlanElementChildrenList'


const DecisionBlock = (props) => {
    console.log(props);
    const {elementId, showChildren, mode, isPreviewMode, plan} = props;
    return (<React.Fragment>
        <Decision {...props} />
        {showChildren && <div><PlanElementChildrenList elementId={elementId}  plan={plan} isPreviewMode={isPreviewMode} mode={mode} elementValue={showChildren} /></div>}
    </React.Fragment>)
}

export default DecisionBlock;
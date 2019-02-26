import React from 'react';
import AssessmentBody from '../AssessmentView/containers/AssessmentBody';
 
const AssessmentsManager = props => {
    const {assessment} = props;
    return <React.Fragment >
            <AssessmentBody assessment={assessment} isBuilderMode />       
        </React.Fragment>
}
 
export default AssessmentsManager;
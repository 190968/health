import React from 'react';
import {Button} from 'antd';
import AssessmentSection from '../../containers/AssessmentSection';
import { BrahmsOutputs } from '../../../../../../../../components/Brahms/components/View/components/Output';
import { AssessmentBodyScore } from './components/Score';

/**
 * the process is the following
 * if we have showAllQuestions = false - means we need to show question by question. if it's like that, showAllSections automatically becomes false
 */
const AssessmentBody = props => {
    const {assessment, sections=[], ...otherProps} = props;
    const {name, getSections=[], showAllSections=true, showAllQuestions=true, points} = assessment || {};

    const {isBuilderMode=false,isCompleted, report, getReport, skippedQuestions=[],skippedByQuestions=[]} = otherProps || {};
    const {getReportedValues} = getReport || {};
    const sectionsLength = sections.length;
    // console.log(skippedByQuestions, 'skippedByQuestions');
    // filter sections and questions
   
    // console.log(getSections, 'getSections');
    // console.log(sections, 'sectionsFiltered');
   
    //const assessmentUpdated = {...assessment, getSections:sections};
    console.log(props, 'assessment');
    return <React.Fragment>
    {sections.map((section, i) => {
        return <AssessmentSection key={section.id} sections={sections} i={i} section={section} reportedValues={getReportedValues} {...props} />
    })}

    {/* {isBuilderMode && <Button type={'primary'} icon={'plus'} >Add Section</Button>} */}

    {isCompleted && <BrahmsOutputs {...props} /> }
    {isCompleted && <AssessmentBodyScore assessment={assessment} report={report} /> }
    {(!isCompleted && ((showAllSections && showAllQuestions) || sectionsLength === 1)) && <div style={{textAlign:'right', 'marginTop':10}}>
        <Button type={'primary'} onClick={props.completeAssessment}>Finish</Button>
        </div>}
    </React.Fragment>
}

export default AssessmentBody;
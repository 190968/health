import React from 'react';
import Scroll from 'react-scroll';
import {Button, Divider} from 'antd';
import AssessmentSection from '../../containers/AssessmentSection';
import { BrahmsOutputs } from '../../../../../../../../components/Brahms/components/View/components/Output';
import { AssessmentBodyScore } from './components/Score';
import { AssessmentSectionManagerButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Section';
import {
    SortableContainer,
    SortableElement,
    arrayMove,
  } from 'react-sortable-hoc';
import { compose, renderComponent, branch } from 'recompose';
import { EmptyList } from '../../../../../../../../components/Loading';
import { AssessmentQuestionValidAnswers } from '../AssessmentQuestion';
import { AssesmentQuestionElementSelect } from '../../../../../../../../components/Assessment/components/Builder/components/Question/select_inline';

var ScrollElement = Scroll.Element;
/**
 * the process is the following
 * if we have showAllQuestions = false - means we need to show question by question. if it's like that, showAllSections automatically becomes false
 */
const AssessmentBody = props => {
    const {assessment, sections=[], loading, ...otherProps} = props;
    const {showAllSections=true, showAllQuestions=true, showBrahms, showValidAnswer} = assessment || {};

    const {isBuilderMode=false, isPreviewMode=false, currentSectionInOrder, currentQuestionInOrder, increaseCurrentQuestion, isCompleted, report, getReport, skippedQuestions=[],skippedByQuestions=[]} = otherProps || {};
    const {getReportedValues} = getReport || {};
    const sectionsLength = sections.length;

    let showQuestionValidAnswer = !isBuilderMode && !isPreviewMode && isCompleted && showValidAnswer === 'summary';

    // console.log(skippedByQuestions, 'skippedByQuestions');
    // filter sections and questions
   
    // console.log(getSections, 'getSections');
    // console.log(sections, 'sectionsFiltered');
   
    //const assessmentUpdated = {...assessment, getSections:sections};
    // console.log(props, 'assessment');
    const currentSection = sections.find((s,i) => i === currentSectionInOrder);
    // show bottom buttons we we can report and not a preview not completed or have only one section or have sections and this is the last one
    const showBottomButtons = (!isBuilderMode && !isPreviewMode && !isCompleted && ((showAllSections && showAllQuestions) && sectionsLength === 1));
    return <React.Fragment>
        {(isBuilderMode && !isPreviewMode && sections.length > 0) && <AssesmentQuestionElementSelect assessment={assessment} section={currentSection} currentInOrder={currentQuestionInOrder} increaseCurrentQuestion={increaseCurrentQuestion} />}
    {/* {isBuilderMode ? <SectionsListWithSortable {...props} useDragHandle getReportedValues={getReportedValues} />:  */}
    <SectionsList {...props} useDragHandle getReportedValues={getReportedValues} />

    {(isBuilderMode && (!sections || sections.length == 0)) && <EmptyList>
        No Sections added
        <AssessmentSectionManagerButton assessment={assessment} label={'Add First Section'} /></EmptyList>}

    {isCompleted && <ScrollElement name="completedBlock">
    {showQuestionValidAnswer && <AssessmentQuestionValidAnswers sections={sections}  />}
    {((showBrahms === 'both' || showBrahms === 'summary') &&  isCompleted) && <BrahmsOutputs {...props} /> }
    {isCompleted && <AssessmentBodyScore assessment={assessment} report={report} /> }
    </ScrollElement>}
    {showBottomButtons && <div style={{textAlign:'right', 'marginTop':10}}>
        <Button type={'primary'} onClick={props.completeAssessment}>Finish</Button>
        </div>}
    </React.Fragment>
}

export default AssessmentBody;


const AssessmentSectionLi = props => <AssessmentSection {...props} />;
const AssessmentSectionSortable = compose(
    // branch(props => props.isBuilderMode, SortableElement)
)(AssessmentSectionLi);



const SectionsListPure = props => {
    const {sections, getReportedValues, isPreviewMode} = props;
    if (isPreviewMode && sections.length === 0) {
        return <EmptyList>Nothing to preview</EmptyList>;
    }
    return sections.map((section, i) => {
        return <AssessmentSectionSortable key={section.id} collection={'sections'} index={i} sections={sections}  i={i} section={section} reportedValues={getReportedValues} {...props} />
    })
}

const SectionsList = compose(
//    branch(props => props.isBuilderMode, SortableContainer),
    // branch(props => props.isBuilderMode, renderComponent(SectionsList)),
)(SectionsListPure);


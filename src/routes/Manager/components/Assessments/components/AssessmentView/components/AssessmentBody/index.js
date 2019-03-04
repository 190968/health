import React from 'react';
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

/**
 * the process is the following
 * if we have showAllQuestions = false - means we need to show question by question. if it's like that, showAllSections automatically becomes false
 */
const AssessmentBody = props => {
    const {assessment, sections=[], ...otherProps} = props;
    const {name, getSections=[], showAllSections=true, showAllQuestions=true, points, showBrahms} = assessment || {};

    const {isBuilderMode=false, isPreviewMode=false, isCompleted, report, getReport, skippedQuestions=[],skippedByQuestions=[]} = otherProps || {};
    const {getReportedValues} = getReport || {};
    const sectionsLength = sections.length;
    // console.log(skippedByQuestions, 'skippedByQuestions');
    // filter sections and questions
   
    // console.log(getSections, 'getSections');
    // console.log(sections, 'sectionsFiltered');
   
    //const assessmentUpdated = {...assessment, getSections:sections};
    // console.log(props, 'assessment');
    // show bottom buttons we we can report and not a preview not completed or have only one section or have sections and this is the last one
    const showBottomButtons = (!isBuilderMode && !isPreviewMode && !isCompleted && ((showAllSections && showAllQuestions) || sectionsLength === 1));
    return <React.Fragment>

    {/* {isBuilderMode ? <SectionsListWithSortable {...props} useDragHandle getReportedValues={getReportedValues} />:  */}
    <SectionsList {...props} useDragHandle getReportedValues={getReportedValues} />

    {(isBuilderMode && (!sections || sections.length == 0)) && <Divider><AssessmentSectionManagerButton assessment={assessment} /></Divider>}

    {((showBrahms === 'both' || showBrahms === 'summary') &&  isCompleted) && <BrahmsOutputs {...props} /> }
    {isCompleted && <AssessmentBodyScore assessment={assessment} report={report} /> }
    {showBottomButtons && <div style={{textAlign:'right', 'marginTop':10}}>
        <Button type={'primary'} onClick={props.completeAssessment}>Finish</Button>
        </div>}
    </React.Fragment>
}

export default AssessmentBody;


const AssessmentSectionLi = props => <AssessmentSection {...props} />;
const AssessmentSectionSortable = compose(
    branch(props => props.isBuilderMode, SortableElement)
)(AssessmentSectionLi);



const SectionsListPure = props => {
    const {sections, getReportedValues} = props;
    return sections.map((section, i) => {
        return <AssessmentSectionSortable key={section.id} collection={'sections'} index={i} sections={sections} i={i} section={section} reportedValues={getReportedValues} {...props} />
    })
}

const SectionsList = compose(
    branch(props => props.isBuilderMode, SortableContainer),
    // branch(props => props.isBuilderMode, renderComponent(SectionsList)),
)(SectionsListPure);


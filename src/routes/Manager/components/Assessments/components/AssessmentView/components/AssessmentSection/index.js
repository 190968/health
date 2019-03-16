import { Button, Card, List, Progress } from 'antd';
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { branch, compose } from 'recompose';
import { AssessmentQuestionManagerButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Question';
import { AssessmentQuestionDeleteButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Question/delete';
import { AssessmentSectionManagerButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Section';
import { AssessmentSectionDeleteButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Section/delete';
import { DragHandle } from '../../../../../../../../components/FormCustomFields/components/Options';
import { ListWithMessage } from '../../../../../../../../components/UI/List';
import AssessmentQuestion from '../../containers/AssessmentQuestion';


const AssessmentSection = props => {
    const {section, i, sections=[], ...otherProps} = props;
    const {isBuilderMode=false, isPreviewMode=false, canReport=false, currentQuestion, currentSection, goPreviousSection, goNextSection, report} = otherProps;
    const {title,  getQuestions=[]} = section || {};
    const {assessment} = props;
    const {isCompleted=false, getReportedValues=[]} = report || {};
    let {
        isAllMandatory,
        allowGoBack,
        showAllQuestions,
        showAllSections} = assessment;

    if (isCompleted || isBuilderMode) {
        showAllQuestions = true;
        showAllSections = true;
    }

    const totalSections = sections.length;
    const isLastSection = totalSections === i+1;
    const isFirstSection = i === 0;
    

    const totalQuestions = getQuestions.length;
    const isLastQuestion = totalQuestions === currentQuestion+1;
    const isPastSection = currentSection > i;
    const sectionIsDimmed = !showAllSections && isPastSection;
    const progress = isCompleted && 100;

    // show buttons if it's only by section, and not by question
    const canShowButtons = !sectionIsDimmed && !isCompleted && showAllQuestions;
    // show finish button if this is the last section and and we show by question or by section
    // console.log(canShowButtons, 'canShowButtons');
    const showFinishButton = canShowButtons && isLastSection && (!showAllSections /*&& !showAllQuestions*/);//showAllQuestions || (!showAllQuestions && isLastSection && isLastQuestion);
    // console.log(showFinishButton, 'showFinishButton');
    // console.log(showAllSections, 'showAllSections');
    // console.log(showAllQuestions, 'showAllQuestions');
    // show next button if we show by section only
    const showNextButton = canShowButtons && !isLastSection && !showAllSections && showAllQuestions && !showFinishButton;// || (!showAllSections && isLastQuestion);
    const showPreviousButton = canShowButtons && (!showAllSections && allowGoBack && !isFirstSection);//!showAllSections && showAllQuestions && !showFinishButton;// || (!showAllSections && isLastQuestion);
    const showBottomButtons = ((canReport || isPreviewMode) && !isCompleted && ((!showAllSections && showAllQuestions) || isLastSection));
    
    // If show by section, No need to show next sections
    if (!showAllSections) {
        if (currentSection < i) {
            return null;
        }
    }

    // FILTER questions
    let questionsToShow = getQuestions;
    // If we show question by question, do not show next questions.
    if (!showAllQuestions) {
        console.log(section, 'section');
        console.log(isPastSection, 'isPastSection');
        console.log(currentQuestion, 'currentQuestion');
        console.log(questionsToShow, 'currentQuestion');
        questionsToShow = questionsToShow.filter((question, i) => {
            return currentQuestion >= i || isPastSection;
        });
        console.log(questionsToShow, 'questionsToShow');
    }

    // Prepare section Buttons
    let cardExtra = [];
    let cardActions = [];
    if (isBuilderMode) {
        cardExtra.push(<AssessmentSectionManagerButton key={'edit'} assessment={assessment} section={section} />);
        // cardExtra.push(<DragHandle key={'drag'} style={{marginLeft:5}} />);
        cardExtra.push(<AssessmentSectionDeleteButton key={'delete'} assessment={assessment} section={section} />);

        cardActions.push(<AssessmentQuestionManagerButton key={'addQuestion'} assessment={assessment} section={section} />);
        cardActions.push(<AssessmentSectionManagerButton key={'addSection'} buttonType={'dashed'} assessment={assessment} afterSection={section} />);//<AssessmentSectionManagerButton assessment={assessment} afterSection={section} />
    } else if (showBottomButtons) {

        if (showPreviousButton)
        cardActions.push(<a className={'likeButton grey'} onClick={goPreviousSection}>Previous Section</a>);

        if (showFinishButton) 
        cardActions.push(<Button type={'primary'} onClick={props.completeAssessment}>Finish</Button>);

        if (showNextButton) 
        cardActions.push(<Button type={'primary'} onClick={goNextSection}>Next</Button>);
        
    }
    if (!isBuilderMode || isPreviewMode) {
        //cardExtra.push(<div style={{width:200}}><Progress /*type="circle" showInfo={false} width={20} strokeWidth={20}*/ percent={progress} /></div>);
    }
    // end Prepare section buttons
     
    
    const opts = {isBuilderMode, assessment, section,  isPastSection, isLastSection, isFirstSection, showAllQuestions, otherProps};
    return <Card title={title} type={'inner'} extra={cardExtra} 
    actions={cardActions}
    // extra={(!isBuilderMode || isPreviewMode) ? <div style={{width:200}}><Progress /*type="circle" showInfo={false} width={20} strokeWidth={20}*/ percent={progress} /></div> : null}
    >

        {sectionIsDimmed && <div className={'dimmed-block'} />}
          
        <AssessmentQuestionsList isBuilderMode useDragHandle lockAxis={'y'} onSortEnd={props.handleUpdateQuestionOrder} questionsToShow={questionsToShow} {...opts}  /> 
        
    </Card>
}

export default AssessmentSection;




const AssessmentQuestionsListPure = props => {
    const {questionsToShow, ...otherProps} = props;
    const {section={}} = props;
    // return <ul>{questionsToShow.map((question, i) => <AssessmentQuestionCurrent index={i} isBuilderMode question={question} i={i} key={`item-${i}`}  />)}</ul>
    return <ListWithMessage
    emptyMessage={'No Questions'}
    dataSource={questionsToShow}
    itemLayout={'vertical'}
    size={'small'}
    split={false}
    renderItem={(question, i) => {
        return <AssessmentQuestionCurrent {...otherProps} index={i} collectionaa={'section-'+section.id} question={question} i={i} key={`item-${i}`} />;
    }}
/>;
}
const AssessmentQuestionsList = compose(
    branch(props => props.isBuilderMode, SortableContainer)
    )(AssessmentQuestionsListPure);


const AssessmentQuestionBody = ({isBuilderMode, assessment, section, question, i, isPastSection, isLastSection, isFirstSection, showAllQuestions, otherProps}) => {
    const {showQuestionNumber} = assessment || {};
    // return <li>oooooooo <DragHandle /></li>;
    let questionCardExtra = [];
    if (isBuilderMode) {
        questionCardExtra.push(<AssessmentQuestionManagerButton key={'manager'} assessment={assessment} section={section} question={question} />);
        questionCardExtra.push(<DragHandle key="drag" style={{marginLeft:5}} />);
        questionCardExtra.push(<AssessmentQuestionDeleteButton  key={'delete'}  assessment={assessment} section={section} question={question} />);
    }
    return <List.Item key={question.id}>
        <List.Item.Meta title={<div><strong>{(showQuestionNumber ? (i + 1) + '. ' : '') + question.title}</strong> <div className={'ant-card-extra'} style={{ float: 'right', padding: '0 !important' }}>{questionCardExtra}</div></div>} description={question.description} />
        <AssessmentQuestion key={question.id} i={i}   question={question} isPastSection={isPastSection} isLastSection={isLastSection} isFirstSection={isFirstSection} showAllQuestions={showAllQuestions} section={section} {...otherProps} />
    </List.Item>;
}
const AssessmentQuestionCurrent = compose(
     branch(props => props.isBuilderMode, SortableElement)
    )(AssessmentQuestionBody);


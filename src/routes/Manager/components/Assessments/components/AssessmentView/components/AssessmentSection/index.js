import React from 'react';
import { Card, List, Button, Icon } from 'antd';
import AssessmentQuestion from '../../containers/AssessmentQuestion';
import { ListWithMessage } from '../../../../../../../../components/UI/List';
import { AssessmentSectionManagerButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Section';
import { AssessmentSectionDeleteButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Section/delete';
import { AssessmentQuestionManagerButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Question';
import { AssessmentQuestionDeleteButton } from '../../../../../../../../components/Assessment/components/Builder/components/Buttons/Question/delete';

const AssessmentSection = props => {
    const {section, i, sections=[], ...otherProps} = props;
    const {isBuilderMode=false, canReport=false, currentQuestion, currentSection, goPreviousSection, goNextSection, skippedQuestions=[], report} = otherProps;
    const {title, description,  getQuestions=[]} = section || {};
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
    console.log(totalSections, 'totalSections');
    console.log(i);
    console.log(isLastSection, 'isLastSection');
    const isFirstSection = i === 0;
    

    const totalQuestions = getQuestions.length;
    const isLastQuestion = totalQuestions === currentQuestion+1;
    const isPastSection = currentSection > i;
    const sectionIsDimmed = !showAllSections && isPastSection;

    // show buttons if it's only by section, and not by question
    const canShowButtons = !sectionIsDimmed && !isCompleted && showAllQuestions;

    // show finish button if this is the last section and and we show by question or by section
    const showFinishButton = canShowButtons && isLastSection && (!showAllSections && !showAllQuestions);//showAllQuestions || (!showAllQuestions && isLastSection && isLastQuestion);
    // show next button if we show by section only
    const showNextButton = canShowButtons && !isLastSection && !showAllSections && showAllQuestions && !showFinishButton;// || (!showAllSections && isLastQuestion);
    const showPreviousButton = canShowButtons && (!showAllSections && allowGoBack && !isFirstSection);//!showAllSections && showAllQuestions && !showFinishButton;// || (!showAllSections && isLastQuestion);
    
    if (!showAllSections) {
        // No need to show future sections untill we reply on current
        if (currentSection < i) {
            return null;
        }
    }

    // filter sections
    let questionsToShow = getQuestions;
    // limit questions
    if (!showAllQuestions) {
        // find reported questions
        questionsToShow = questionsToShow.filter((question, i) => {
            return currentQuestion >= i || isPastSection;
        });
    }
    let cardExtra = [];
    let cardActions = [];

    if (isBuilderMode) {
        cardExtra.push(<AssessmentSectionManagerButton key={'edit'} assessment={assessment} section={section} />);
        cardExtra.push(<Icon type="drag" key={'drag'} />);
        cardExtra.push(<AssessmentSectionDeleteButton key={'delete'} assessment={assessment} section={section} />);
        //

        cardActions.push(<AssessmentQuestionManagerButton key={'addQuestion'} assessment={assessment} section={section} />);
        cardActions.push(<AssessmentSectionManagerButton key={'addSection'} assessment={assessment} afterSection={section} />);//<AssessmentSectionManagerButton assessment={assessment} afterSection={section} />
    }
     
    console.log(props, 'SECTION');

    

    return <Card title={title} type={'inner'} extra={cardExtra} 
    actions={cardActions}
    >

        
            {sectionIsDimmed && <div className={'dimmed-block'} />}
        <ListWithMessage
            emptyMessage={'No Questions'}
            dataSource={questionsToShow}
            itemLayout={'vertical'}
            size={'small'}
            
            renderItem={(question, i) => {
                let questionCardExtra = [];

                if (isBuilderMode) {
                    questionCardExtra.push(<AssessmentQuestionManagerButton assessment={assessment} question={question} />);
                    questionCardExtra.push(<Icon type="drag" />);
                    questionCardExtra.push(<AssessmentQuestionDeleteButton assessment={assessment} question={question}  />);
                }
                return <List.Item key={question.id} extra={questionCardExtra} >
                        <List.Item.Meta
                            title={(i+1)+'. '+question.title}
                            description={question.description}
                        />
                        <AssessmentQuestion key={question.id} i={i} question={question} isPastSection={isPastSection} isLastSection={isLastSection} isFirstSection={isFirstSection} showAllQuestions={showAllQuestions} section={section} {...otherProps} />
                    </List.Item>
            }}

        />
       {(canReport && !isCompleted && ((!showAllSections && showAllQuestions) || isLastSection)) && <div style={{textAlign:'right'}}>
       
            {showPreviousButton && <span className={'link bump-r grey'} onClick={goPreviousSection}>Previous Section</span>}
            {showFinishButton && <Button type={'primary'} onClick={props.completeAssessment}>Finish</Button>}
            {showNextButton && <Button type={'primary'} onClick={goNextSection}>Next</Button>}
       
       </div>}
    </Card>
}

export default AssessmentSection;
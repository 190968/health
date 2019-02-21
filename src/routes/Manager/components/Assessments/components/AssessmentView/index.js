import React from 'react';
import AssessmentBody from './containers/AssessmentBody';
import AssessmentHeader from './components/AssessmentHeader';
import { Divider, Button } from 'antd';
import { ModalBodyFooter } from '../../../../../../components/Modal';

const AssessementView = props => {
    const {userAssessment, user, date, handleNewReport, ...otherProps} = props;
    let {assessment} = props;
    const {report} = otherProps;
    const {canReport} = userAssessment;
    const isOnetime = false;
    const {isCompleted} = report || {};
    if (isCompleted) {
        assessment = {...assessment, showAllQuestions: true, showAllSections:true};
    }

    return <React.Fragment>
        <AssessmentHeader userAssessment={userAssessment} user={user} report={report} />
        <Divider />
        {report && <AssessmentBody userAssessment={userAssessment} assessment={assessment} report={report} user={user} date={date} isCompleted={isCompleted} canReport={canReport} {...otherProps} />}
        {(!report && canReport) && <div style={{textAlign:'center'}}><Button type={'primary'} onClick={handleNewReport} size={'large'} >Start Assessment Now</Button></div>}
        {(isCompleted && !isOnetime && canReport) && <ModalBodyFooter><Button type={'primary'} onClick={handleNewReport} >New report</Button></ModalBodyFooter>}
        </React.Fragment>;
}

export default AssessementView;
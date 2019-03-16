import React from 'react';
import AssessmentBody from './containers/AssessmentBody';
import AssessmentHeader from './components/AssessmentHeader';
import { Card, Divider, Button, Progress } from 'antd';
import { ModalBodyFooter } from '../../../../../../components/Modal';
import AssessmentSettingsButton from './components/AssessmentSettingsButton';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import { CardExtraSplit } from '../../../../../../components/Card/components/CardExtraSplit';

const AssessementView = props => {
    const {userAssessment, user, date, handleNewReport, ...otherProps} = props;
    let {assessment} = props;
    const {report} = otherProps;
    const {canReport} = userAssessment || {};
    const {name, showProgress} = assessment || {};
    const isOnetime = false;
    const {isCompleted, progress} = report || {};
    if (isCompleted) {
        assessment = {...assessment, showAllQuestions: true, showAllSections:true};
    }

    const extra = <>
        {showProgress && <CardExtraSplit style={{minWidth: 200}} ><Progress percent={progress} /></CardExtraSplit>}
        <CardExtraSplit> <AssessmentSettingsButton userAssessment={userAssessment} user={user} date={date} /></CardExtraSplit>
        </>;

    return  <PageHeaderLayout
    title={name}
    action={extra}
    mainAffix
    // action={<CardExtraItems>
    //     {/* <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} /> */}
    //     {/* <BrahmManagerButton icon={'plus'} refetch={props.refetch} /> */}
    //     </CardExtraItems>}
>
        {/* <AssessmentHeader userAssessment={userAssessment} user={user} report={report} /> */}
        {/* <Divider /> */}
        {report && <AssessmentBody userAssessment={userAssessment} assessment={assessment} report={report} user={user} date={date} isCompleted={isCompleted} canReport={canReport} {...otherProps} />}
        {(!report && canReport) && <div style={{textAlign:'center'}}><Button type={'primary'} onClick={handleNewReport} size={'large'} icon={"play-circle"} >Start Assessment Now</Button></div>}
        {(isCompleted && !isOnetime && canReport) && <ModalBodyFooter><Button type={'primary'} icon={'plus'} onClick={handleNewReport} >New Report</Button></ModalBodyFooter>}
       
</PageHeaderLayout>
     
}

export default AssessementView;
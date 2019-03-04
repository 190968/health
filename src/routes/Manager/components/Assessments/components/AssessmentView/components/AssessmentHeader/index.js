import React from 'react';
import { Progress, Icon, Divider, Tooltip } from 'antd';
import AssessmentSettingsButton from '../../components/AssessmentSettingsButton';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { AvatarWithName } from '../../../../../../../User/components/AvatarWithName';
import AssessmentViewButton from '../../../../containers/AssessmentViewButton';

const AssessementHeader = props => {

    const { userAssessment, user, report, date, handleNewReport, ...otherProps } = props;

    const { canReport, createdOn, user: patient, startTime, startDate, endDate, comments, assessment, getLatestReport } = userAssessment;

    const {instructions} = assessment;
    const { isCompleted, completedDate, progress, date: reportDate } = report || {};
    let descriptionDetails = [
        //['Name', user.fullName],
        // ['Title', assessment.name],
        ['Patient', <AvatarWithName user={patient} widget />],
        ['Report Time', startTime && moment(startTime).format('LT')],
        ['Created on', createdOn && moment(createdOn).format('lll')],
        ['Started on', startDate && moment(startDate).format('lll')],
        ['Ends on', endDate && moment(endDate).format('lll')],
        ['Comments', comments],
        ['Instructions', instructions],
        // ['Settings', <AssessmentSettingsButton userAssessment={userAssessment} user={user} date={date} />],
        ['Progress', report && <Progress percent={progress} />],
    ];
    if (!report && getLatestReport) {
        descriptionDetails.push([<Divider key={'dev'}>Previous report</Divider>]);
        // console.log(getLatestReport, 'getLatestReport');
        const { progress: latestProgress, date: latestDate } = getLatestReport || {};
        descriptionDetails.push(['Previous report on', <React.Fragment>
            {moment(latestDate).format('lll')} <AssessmentViewButton userAssessment={userAssessment} date={date} user={user} label={<Tooltip title={'View Report'}><Icon type="solution" /></Tooltip>} />
        </React.Fragment>]);
        descriptionDetails.push(['Previous progress', <Progress percent={latestProgress} />]);
    }
    if (isCompleted) {
        descriptionDetails.push(['Completed', completedDate && moment(completedDate).format('lll')]);
    }


    return <DescriptionList col={1} details={descriptionDetails} />
}

export default AssessementHeader;
import React from 'react';
import {Card} from 'antd';
// import { TableWithMessage } from '../../../../../../components/Tables';
import moment from 'moment';
import { TableWithMessage } from '../../../Tables';
import { getTableDateProps } from '../../../Tables/TableColumn';
import AvatarWithName from '../../../../routes/User/components/AvatarWithName';
import { GenderIcon } from '../../../User/components/WidgetCard';
import AssessmentViewButton from '../../../../routes/Manager/components/Assessments/containers/AssessmentViewButton';
// import AvatarWithName from '../../../../../User/components/AvatarWithName';
// import AssessmentViewButton from '../../containers/AssessmentViewButton';

const AssessmentReportsSummary = props => {

    const {assessmentReports=[], assessment, total=0,  loading=false} = props;
    const dataSource = assessmentReports;
    const columns = [
        // {
        //     title: 'Date',
        //     dataIndex: 'completedDate',
        //     key: 'completedDate',
        //     render: (completedDate, info) => {
        //         const {isCompleted, date} = info;
        //         const label = isCompleted ? moment(completedDate).format('lll') : moment(date).format('l');

        //         return <AssessmentViewButton userAssessment={{...userAssessment, getLatestReport: info}} date={moment(date).format('YYYY-MM-DD')} user={user} label={label} />
        //     },
        // },
        {
            title: 'Name',
            dataIndex: 'user',
            key: 'user',
            render: (user) => {
                return <AvatarWithName user={user} />
            },
        },
        {
            title: 'Age',
            // dataIndex: 'age',
            key: 'age',
            render: (info) => {
                const {user} = info;
                const {age} = user;
                return age
            },
        },
        {
            title: 'Gender',
            // dataIndex: 'gender',
            key: 'gender',
            render: (info) => {
                const {user} = info;
                const {gender} = user;
                return <GenderIcon gender={gender} />
            },
        },
        {
            title: 'Last Report',
            key: 'executeDate',
            // dataIndex: 'getLastUserAssessmentReport',
            //...getTableDateProps('lastUserAssessmentReport'),
            render: (info) => {
                // console.log(info);
                const {user, getLastUserAssessmentReport} = info;
                const {date} = getLastUserAssessmentReport || {};
                // return date && <AssessmentViewButton userAssessment={{...getLastUserAssessmentReport, assessment}}z user={user} date={date} label={moment(date).format('l')} />
                return date &&  moment(date).format('l');
            },
        },
        {
            title: '# of Times Reported',
            dataIndex: 'totalReports',
            key: 'reportedTotal',
        },
        {
            title: 'Average Score',
            dataIndex: 'averageScore',
            key: 'score',
        },
    ];
   
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" /*title={'History '+ (total > 0 ? ' ('+total+')' : '')}*/ >
        <TableWithMessage
        emptyMessage={'No Reports'}
        size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default AssessmentReportsSummary;
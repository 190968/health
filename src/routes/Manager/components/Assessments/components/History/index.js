import React from 'react';
import {Card} from 'antd';
import { TableWithMessage } from '../../../../../../components/Tables';
import moment from 'moment';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import AssessmentViewButton from '../../containers/AssessmentViewButton';

const AssessmentHistory = props => {

    const {history=[], total=0, user, userAssessment, loading=false} = props;

    const columns = [
        {
            title: 'Date',
            dataIndex: 'completedDate',
            key: 'completedDate',
            render: (completedDate, info) => {
                const {isCompleted, date} = info;
                const label = isCompleted ? moment(completedDate).format('lll') : moment(date).format('l');

                return <AssessmentViewButton userAssessment={{...userAssessment, getLatestReport: info}} date={moment(date).format('YYYY-MM-DD')} user={user} label={label} />
            },
        },
        {
            title: 'By',
            dataIndex: 'completedBy',
            key: 'completedBy',
            render: (user) => {
                return <AvatarWithName user={user} />
            },
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress) => {
                return progress ? progress + '%' : '';
            },
        },
    ];
    const dataSource = history;
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" title={'History '+ (total > 0 ? ' ('+total+')' : '')} >
        <TableWithMessage
        emptyMessage={'No History'}
        size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default AssessmentHistory;
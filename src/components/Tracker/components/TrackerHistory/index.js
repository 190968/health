import React from 'react';
import { Table, Card } from 'antd';
import { formatDateToday, formatDateTimeToday } from '../../../Other/utils';
import { formatTrackerValue } from '../../../../routes/Plan/components/BiometricPlan/components/TrackerCard/components/TrackerCardValue';
import AvatarWithName from '../../../../routes/User/components/AvatarWithName';
import { TableLoadModeButton } from '../../../Tables/TableLoadMoreButton';
import Avatar from '../../../../routes/User/components/Avatar';


const TrackerHistory = props => {
    const { measurement, reports=[], user, totalReports, loading=false } = props;
    const haveMoreEntries = totalReports > reports.length;
    console.log(props);

    const columns = [{
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width:120,
        render: date => formatDateToday(date, { easyMode: true }    )
    }, {
        title: 'Value',
        dataIndex: 'valueFormatted',
        key: 'value',
        render: value => formatTrackerValue({ measurement, value })
    }, {
        title: 'Reported',
        dataIndex: 'reportedOn',
        key: 'reportedOn',
        width:120,
        render: date => formatDateTimeToday(date, { easyMode: true, tooltip:true })
    },
    {
        title: 'By',
        dataIndex: 'reporter',
        key: 'reporter',
        width:150,
        render: reporter => reporter && <AvatarWithName user={reporter} mode={'simple'} isSelf={reporter.id===user.id} />
    }];

    const footer = haveMoreEntries ? () => <TableLoadModeButton onClick={props.loadMoreEntries} /> : undefined;
    return <Card title={'Tracker History'} type={'table ant-card-type-inner'} loading={loading}>
        <Table size={'small'} dataSource={reports} rowKey={'id'} scroll={{ y: 300 }} columns={columns} pagination={false}
        footer={footer}
        />
    </Card>
}

export default TrackerHistory;
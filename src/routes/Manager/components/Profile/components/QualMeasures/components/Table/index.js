import React from 'react';
import Truncate from 'react-truncate';
import moment from 'moment';
import { TableWithMessage } from '../../../../../../../../components/Tables';
import { UserQMDeleteButton } from '../../containers/DeleteButton';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
import QualityMeasureReportButton from '../Report/components/Button';
// import sort from '../../../../../../components/Tables/sort';

export const QualMeasuresTable = props => {

    const {items=[], user, total=0, loading=false} = props;
    
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };

    const columns = [
        {
            title: 'Measure',
            key: 'title',
            render: (info) => {
                return <QualityMeasureReportButton user={user} qm={info.qualityMeasure} />
            },
            // sorter: (a, b) => sort(a,b,"qualityMeasure","title"),

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Closed',
            dataIndex: 'date',
            key: 'date',
            render: (date) => {
                return moment(date).format('L')
            },
            // sorter: (a, b) => a.date - b.date,
        },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    // {key:'assign', content:  <UserQualityMeasuresManagerButton user={user} qm={info} asMenuItem />},
                    {key:'delete', content: <UserQMDeleteButton user={user} qm={info} onDelete={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        },
    ];

    return <React.Fragment>
        <TableWithMessage
        emptyMessage={'No Quality Measures'}
        size="middle" dataSource={items} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </React.Fragment>;
    
}

export default QualMeasuresTable;
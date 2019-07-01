import React from 'react';
import {Card, Table, DatePicker, Button, Menu, Dropdown, Icon} from 'antd';
import moment from "moment/moment";
import Truncate from 'react-truncate';
import { HealthRecordDeleteButton } from './contaienrs/HealthRecordDeleteButton';
import { HealthManagerButton } from '../HealthManager/components/Button';
import { TableWithMessage } from '../../../../components/Tables';
import { HealthViewButton } from '../View/components/Button';
import { TableColumnDates, getTableDateProps } from '../../../../components/Tables/TableColumn';

const UserHealthTable = props => {
    const {items=[], user, total, changePage, refetch, loading} = props;
    // const isMcgrawhill = networkModuleExists('is_mcgrawhill')
    const columns = [
        {
            title: 'Type',
            dataIndex: 'healthTypeTxt',
            key: 'healthTypeTxt',
            width:200,
            filters: [
                { text: 'Medication', value: 'medication' },
                { text: 'Diagnosis', value: 'diagnosis' },
                { text: 'Condition', value: 'condition' },
                { text: 'Lab Result', value: 'lab_result' },
            ],
            onFilter: (value, record) => record.healthType.indexOf(value) === 0,
            sorter: (a, b) => a.healthTypeTxt.length - b.healthTypeTxt.length,
            // render: title => {
            //     return <React.Fragment><Icon type="medicine-box" theme="outlined" /> {title}</React.Fragment>
            // }
            render: (title, info) => {
                return <HealthViewButton healthRecord={info} user={user} refetch={props.refetch} label={<Truncate  lines={1} ><Icon type="medicine-box" theme="outlined" /> {title || 'Untitled'}</Truncate>} asText />
                //return <HealthManagerButton healthRecord={info} user={user} label={<Truncate  lines={1} >{title}</Truncate>} asText />
            },
        }, 
        {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
        
    },
    
     {
        title: 'Added',
        key: 'date',
        ...getTableDateProps('createdDate'),
    },
    // {
    //     title: '',
    //     width: 50,
    //     render: (title, record) => {
    //         const menu = (
    //             <Menu>
    //                 <Menu.Item key={'delete'} >
    //                     <HealthRecordDeleteButton record={record} onDelete={refetch} />
    //                 </Menu.Item>
    //             </Menu>
    //         );
    //         return <Dropdown overlay={menu} trigger={['click']}>
    //             <Icon type="setting" />
    //         </Dropdown>;
    //     }
    // }
    ];

    const pageOpts = {
        pageSize:20,
        total: total,
        hideOnSinglePage: true,
        onChange: changePage,
    };
    const title = 'Health Records';

    return <Card title={title} type={'table'}  extra={<HealthManagerButton user={user} icon={'plus'} refetch={refetch} />}>
        <TableWithMessage
        emptyMessage={'No Health Records'}
        dataSource={items} columns={columns} loading={loading} rowKey={'id'} pagination={false} />
        </Card>
}

export default UserHealthTable;
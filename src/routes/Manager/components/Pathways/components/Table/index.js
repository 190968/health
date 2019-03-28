import { DatePicker, Dropdown, Icon, Menu } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { TableWithMessage } from '../../../../../../components/Tables';
import sort from '../../../../../../components/Tables/sort';
import { PathwayFlowButton } from './components/Buttons';
import './index.css';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import { PathwayManagerButton } from '../Buttons/components/Manager';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import PathwayDeleteButton from '../Buttons/containers/Delete';
import { TableColumnSearch } from '../../../../../../components/Tables/TableColumn';

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const PathwayTable = props => {
     
        const {pathways, loading, total, filterUsed, search} = props;

        const showEmpty = total ===0 && !filterUsed;
        const columns = [{
            title: 'Title',
            // dataIndex: 'title',
            key: 'title',
            render: plan => <PathwayManagerButton pathway={plan} label={plan.title} />,
            filterDropdown: (props) => <TableColumnSearch   onSearch={props.doSearch} search={search} />,
			filterIcon: <Icon type="search" />
        },
            {
                title: 'Cancer',
                dataIndex: 'cancer',
                key: 'cancer',
                render: (text, info) => {
                    return info.cancer.title || ''
                },
                // sorter: (a, b) => sort(a, b, "cancer"),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'statusText',
                render: (text, info) => {
                    return info.status === '1' ? 'Published' : 'Draft';
                },
                // sorter: (a, b) => sort(a, b, "status"),
            },
            {
                title: 'Created',
                dataIndex: 'createdOn',
                key: 'date',
                render: (info) => moment(info).format('L'),
            },
            {
                title: 'By',
                dataIndex: 'creator',
                key: 'creator',
                render: (user, info) => {
                    return <AvatarWithName user={user} />
                },
                // sorter: (a, b) => sort(a, b, "creator"),
            }, {
                className: 'action',
                width:50,
                render: (info) => {
                    const items = [
                        {key:'edit', content:  <PathwayManagerButton pathway={info} />},
                        {key:'flow', content:  <PathwayFlowButton pathway={info} />},
                        {key:'delete', content: <PathwayDeleteButton pathway={info} refetch={props.refetch} asMenuItem />}
                    ];
                    return <SettingsDropdown items={items} />
                }
            },
        ];

    return (
        <TableWithMessage
        total={total}
        dataSource={pathways} 
        loading={loading} 
        columns={columns} 
        showEmpty={showEmpty}
        />
    )

}
export default PathwayTable;
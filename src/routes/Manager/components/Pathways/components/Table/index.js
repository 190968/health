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

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const PathwayTable = props => {
     
        const {pathways, loading, total} = props;
        const columns = [{
            title: 'Title',
            // dataIndex: 'title',
            key: 'title',
            render: plan => <PathwayManagerButton pathway={plan} label={plan.title} />
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
                render: (info) => {
                    const menu = (
                        <Menu>
                            <Menu.Item>
                                <PathwayManagerButton pathway={info} />
                            </Menu.Item>
                            <Menu.Item>
                                <PathwayFlowButton pathway={info} />
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="delete"/> Delete
                            </Menu.Item>
                        </Menu>
                    );
                    return <Dropdown overlay={menu} trigger={['click']}>
                        <Icon type="setting"/>
                    </Dropdown>;
                },                
            width:50
            },
        ];

    return (
        <TableWithMessage
        total={total}
        dataSource={pathways} 
        loading={loading} 
        columns={columns} 
        />
    )

}
export default PathwayTable;
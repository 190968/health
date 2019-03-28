import React from 'react';
import { Card, Progress } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import CancerManagerButton from '../Buttons/components/Manage';
import CancerDeleteButton from '../Buttons/containers/Delete';
import CancerViewButton from '../Buttons/components/View';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { TableWithMessage } from '../../../../../../components/Tables';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
 

 
const CancersTable = props => {
    const { cancers:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <CancerViewButton cancer={info} button={false} />
        }
      },
    //   {
    //     title: 'Status',
    //     dataIndex: 'status',
    //     key: 'status',
    //     render: status => <StatusTag status={status} />
    //   },
      {
            title: 'Created',
            key: 'createdOn',
            ...getTableDateProps('createdOn'),
        },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'edit', content:  <CancerManagerButton button={false} label={'Edit'} cancer={info} asMenuItem />},
                    {key:'delete', content: <CancerDeleteButton  cancer={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No Cancers added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default CancersTable;
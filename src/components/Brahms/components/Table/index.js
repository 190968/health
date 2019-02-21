import React from 'react';
import { Card, Progress } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import BrahmManagerButton from '../Buttons/components/Manage';
import BrahmDeleteButton from '../Buttons/containers/Delete';
import BrahmViewButton from '../Buttons/components/View';
import { getTableDateProps } from '../../../Tables/TableColumn';
import SettingsDropdown from '../../../UI/SettingsDropdown';
import { TableWithMessage } from '../../../Tables';
 

 
const BrahmsTable = props => {
    const { brahms:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <BrahmViewButton brahm={info} button={false} />
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
                    {key:'edit', content:  <BrahmManagerButton button={false} label={'Edit'} brahm={info} asMenuItem />},
                    {key:'delete', content: <BrahmDeleteButton  brahm={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No Brahms added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default BrahmsTable;
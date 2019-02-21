import React from 'react';
import { Card, Progress } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import {{pascalCase $moduleName}}ManagerButton from '../Buttons/components/Manage';
import {{pascalCase $moduleName}}DeleteButton from '../Buttons/containers/Delete';
import {{pascalCase $moduleName}}ViewButton from '../Buttons/components/View';
 

 
const {{pascalCase $moduleName}}sTable = props => {
    const { {{camelCase $moduleName}}s:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <{{pascalCase $moduleName}}ViewButton {{camelCase $moduleName}}={info} button={false} />
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
                    {key:'edit', content:  <{{pascalCase $moduleName}}ManagerButton button={false} label={'Edit'} {{camelCase $moduleName}}={info} asMenuItem />},
                    {key:'delete', content: <{{pascalCase $moduleName}}DeleteButton  {{camelCase $moduleName}}={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No {{pascalCase $moduleName}}s added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default {{pascalCase $moduleName}}sTable;
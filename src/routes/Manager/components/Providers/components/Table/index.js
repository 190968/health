import React from 'react';
import { Card, Progress, Badge } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import ProviderManagerButton from '../Buttons/components/Manage';
import ProviderDeleteButton from '../Buttons/containers/Delete';
import ProviderViewButton from '../Buttons/components/View';
import { getTableCountProps, getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { TableWithMessage } from '../../../../../../components/Tables';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
 

 
const ProvidersTable = props => {
    const { providers:dataSource, total, loading, status} = props; 

    let columns = [{
        title: 'Name',
        key: 'name',
        render: (info) => {
            const {provider} = info;
            return <ProviderViewButton provider={provider} networkProvider={info} button={false} />
        }
      },
      {
        title: 'Patients',
        //dataIndex: 'getTotalPatients',
        key: 'getTotalPatients',
        //...getTableCountProps()
        render: info => {
            const {provider} = info;
            const {getTotalPatients} = provider || {};
            return getTotalPatients;
        }
        // <Badge count={count} overflowCount={9999} />
      },
      {
        title: 'Managers',
        key: 'getTotalManagers',
        render: info => {
            const {provider} = info;
            const {getTotalManagers} = provider || {};
            return getTotalManagers;
        }
      },
       {
             title: 'Created',
             key: 'createdOn',
             ...getTableDateProps('createdOn'),
         },
         {
            title: 'By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: user => user && <AvatarWithName user={user} />
        },
        ];
        if (status !== 'archived') {
            columns.push({
                title: '',
                key: 'act',
                width:50,
                render: (info) => {

                    const {provider} = info;
                    const {canBeEdited} = provider;
                    if (!canBeEdited) {
                        return null;
                    }
                    const items = [
                        {key:'edit', content:  <ProviderManagerButton button={false} label={'Edit'} provider={provider} asMenuItem />},
                        {key:'delete', content: <ProviderDeleteButton provider={provider} refetch={props.refetch} asMenuItem />}
                    ];
                    return <SettingsDropdown items={items} />
                }
            })
        } else {
            columns.push({
                     title: 'Archived',
                     key: 'deletedOn',
                     ...getTableDateProps('deletedOn'),
                 });
            columns.push({
                    title: 'By',
                    dataIndex: 'deletedBy',
                    key: 'deletedBy',
                    render: user => user && <AvatarWithName user={user} />
                });
        }
    return <TableWithMessage
        emptyMessage={'No Providers added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default ProvidersTable;
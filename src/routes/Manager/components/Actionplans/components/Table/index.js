import React from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import ActionplansManagerButton from '../Buttons/components/Manage';
import ActionplansDeleteButton from '../Buttons/containers/Delete';
// import ActionplansViewButton from '../Buttons/containers/View';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { TableWithMessage } from '../../../../../../components/Tables';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import { StatusTag } from '../../../../../../constants/statuses';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
 

 
const ActionplansTable = props => {
    const { plans:dataSource, total, status, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <Link to={'/builder/ap/'+info.id} >{title}</Link>
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => <StatusTag status={status} />
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
            render: user => <AvatarWithName user={user} />
          },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'edit', content:  <ActionplansManagerButton  plan={info} />},
                    {key:'delete', content: <ActionplansDeleteButton  plan={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];

        if (status) {
            columns = columns.filter(c => c.key !== 'status'); 
        }
    return <TableWithMessage
        emptyMessage={'No Actionplanss added'}
        dataSource={dataSource} 
        columns={columns}
        total={total}
        onChange={props.handleTableChange}
        loading={loading}
        rowKey={'id'}
        />
}

export default ActionplansTable;
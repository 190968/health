import React from 'react';
import Truncate from 'react-truncate';
import { Card, Progress } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import PersonalNoteManagerButton from '../Buttons/components/Manage';
import PersonalNoteDeleteButton from '../Buttons/containers/Delete';
import PersonalNoteViewButton from '../Buttons/components/View';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { TableWithMessage } from '../../../../../../components/Tables';
 

 
const PersonalNotesTable = props => {
    const { personalNotes:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <PersonalNoteViewButton personalNote={info} button={false} />
        }
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        render: (note) => <Truncate lines={1} >{note}</Truncate>
      },
    //   {
    //     title: 'Status',
    //     dataIndex: 'status',
    //     key: 'status',
    //     render: status => <StatusTag status={status} />
    //   },
      {
            title: 'Date',
            key: 'createdOn',
            ...getTableDateProps('createdOn'),
        },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'edit', content:  <PersonalNoteManagerButton button={false} label={'Edit'} personalNote={info} asMenuItem />},
                    {key:'delete', content: <PersonalNoteDeleteButton  personalNote={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No Personal Notes added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default PersonalNotesTable;
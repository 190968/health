import React from 'react';
import { Card, Progress } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import ChemotherapyManagerButton from '../Buttons/components/Manage';
import ChemotherapyDeleteButton from '../Buttons/containers/Delete';
import ChemotherapyViewButton from '../Buttons/components/View';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { TableWithMessage } from '../../../../../../components/Tables';
 

 
const ChemotherapysTable = props => {
    const { chemotherapies:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <ChemotherapyViewButton chemotherapy={info} button={false} />
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
                    {key:'edit', content:  <ChemotherapyManagerButton button={false} label={'Edit'} chemotherapy={info} asMenuItem />},
                    {key:'delete', content: <ChemotherapyDeleteButton  chemotherapy={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No Chemotherapys added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default ChemotherapysTable;
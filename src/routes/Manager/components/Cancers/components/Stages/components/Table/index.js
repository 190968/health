import React from 'react';
import { Card, Progress } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import CancerStageManagerButton from '../Buttons/components/Manage';
import CancerStageDeleteButton from '../Buttons/containers/Delete';
import CancerStageViewButton from '../Buttons/components/View';
import { getTableDateProps } from '../../../../../../../../components/Tables/TableColumn';
import { TableWithMessage } from '../../../../../../../../components/Tables';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
 

 
const CancerStagesTable = props => {
    const { cancerStages:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <CancerStageViewButton cancerStage={info} button={false} />
        }
      },
      {
        title: 'Letters',
        dataIndex: 'letters',
        key: 'letters',
        render: (info) => {
            return <span>{info}</span>
        },
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
                    {key:'edit', content:  <CancerStageManagerButton button={false} label={'Edit'} cancerStage={info} asMenuItem />},
                    {key:'delete', content: <CancerStageDeleteButton  cancerStage={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }];
    return <TableWithMessage
        emptyMessage={'No CancerStages added'}
        dataSource={dataSource} 
        columns={columns}
        onChange={props.handleTableChange}
        loading={loading}
        total={total}
        rowKey={'id'}
        />
}

export default CancerStagesTable;
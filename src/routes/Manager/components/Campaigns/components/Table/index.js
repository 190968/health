import React from 'react';
import { Card, Progress } from 'antd';
// import { TableWithMessage } from '../../../../../../components/Tables';
// import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import moment from 'moment';
// import DefaultI18nEn from '../../../../../../i18n/en';
import { FormattedMessage } from 'react-intl';
import CampaignManagerButton from '../Buttons/components/Manage';
import CampaignDeleteButton from '../Buttons/containers/Delete';
import CampaignViewButton from '../Buttons/components/View';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import { TableWithMessage } from '../../../../../../components/Tables';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import { formatStatus, StatusTag } from '../../../../../../constants/statuses';
import CampaignPopulationButton from '../Buttons/components/Population';
// import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
 


 
const CampaignsTable = props => {
    const { campaigns:dataSource, total, loading} = props; 

    let columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'name',
        render: (title, info) => {
            return <CampaignViewButton campaign={info} /*label={<>{title} <StatusTag status={info.status} /></>}*/ button={false} />
        }
        },
        {
            title: 'Executed',
            key: 'executeDate',
            ...getTableDateProps('executeDate'),
        },
        {
            title: 'Population',
            dataIndex: 'getPopulation',
            key: 'population',
            render: (getPopulation, info) => {
                const {totalCount} = getPopulation;
                return totalCount && <CampaignPopulationButton label={totalCount} campaign={info} />
            }
          },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return <StatusTag status={status} />
            }
            },
        {
            title: 'Created',
            key: 'createdOn',
            ...getTableDateProps('createdOn'),
        },
        {
            title: 'Completion',
            dataIndex: 'progress',
            key: 'comletion',
            render : progress => (progress || progress >= 0) && <Progress percent={progress} />
          }, 
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'edit', content:  <CampaignManagerButton button={false} label={'Edit'} campaign={info} asMenuItem />},
                    {key:'delete', content: <CampaignDeleteButton  campaign={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }
     ];
     const pagination={
		pageSize: 20,
		total:total,
      }
      console.log(total);
      
    return <TableWithMessage
        emptyMessage={'No Campaigns added'}
        dataSource={dataSource} 
        columns={columns}
        loading={loading}
        rowKey={'id'}
        onChange={props.handleTableChange}
        pagination={pagination}
        />
}

export default CampaignsTable;
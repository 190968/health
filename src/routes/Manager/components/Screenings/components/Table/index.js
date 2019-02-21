import React from 'react';
import { Card, Progress } from 'antd';
import { TableWithMessage } from '../../../../../../components/Tables';
import moment from 'moment';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import DefaultI18nEn from '../../../../../../i18n/en';
import { FormattedMessage } from 'react-intl';
import ScreeningsManagerButton from '../Buttons/components/Manage';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import ScreeningPopulationButton from '../Buttons/components/Population';
import { StatusTag } from '../../../../../../constants/statuses';
import ScreeningDeleteButton from '../Buttons/containers/Delete';
 


const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'responded', label: <FormattedMessage {...DefaultI18nEn.filterResponded} /> },
    { value: 'opened', label: <FormattedMessage {...DefaultI18nEn.filterOpened} /> },
    { value: 'unopened', label: <FormattedMessage {...DefaultI18nEn.filterUnOpened} /> },
];
 
const ScreeningsTable = props => {
    const {screenings, total, loading} = props; 


const columns = [{
    title: 'Name',
    dataIndex: 'title',
    key: 'name',
    render: (title, info) => {
        return <ScreeningPopulationButton screening={info} />
    }
  }, {
    title: 'Execution Date',
    dataIndex: 'executeDate',
    key: 'executeDate',
    render: date => date && moment(date).format('l')
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => <StatusTag status={status} />
  }, {
    title: 'Population',
    dataIndex: 'getPopulation',
    key: 'population',
    render: (getPopulation, info) => {
        const {totalCount} = getPopulation;
        return <ScreeningPopulationButton screening={info} label={totalCount} />
    }
  }, {
    title: 'Completion',
    dataIndex: 'progress',
    key: 'comletion',
    render : progress => (progress || progress >= 0) && <Progress percent={progress} />
  }, {
    title: '',
    key: 'act',
    width:50,
    render: (info) => {
        const items = [
            {key:'edit', content:  <ScreeningsManagerButton button={false} label={'Edit'} screening={info} asMenuItem />},
            {key:'delete', content: <ScreeningDeleteButton screening={info} refetch={props.refetch} asMenuItem />}
        ];
        return <SettingsDropdown items={items} />
    }
    }];


    return <Card type={'table'} 
    // extra={<CardQuickFilter size={'large'} filters={filters} value={props.activityStatus || 'all'} onChange={props.loadByActivityStatus} />}
>
        <TableWithMessage
        emptyMessage={'No Screenings added'}
        dataSource={screenings} columns={columns}
        loading={loading}
        total={total}
        rowKey={'id'}
        // components = {{
        //     body: {
        //         row: props => {
        //             console.log(props)
        //         },
        //     },
        //   }}
        />
        </Card>
}

export default ScreeningsTable;
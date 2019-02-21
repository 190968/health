import React from 'react';
import { Card, Button } from 'antd';
import { TableWithMessage } from '../../../../../../components/Tables';
import moment from 'moment';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import DefaultI18nEn from '../../../../../../i18n/en';
import { FormattedMessage } from 'react-intl';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import ScreeningPopulationUserManagerButton from '../Buttons/components/Population/userManager';
import { CardExtraSplit } from '../../../../../../components/Card/components/CardExtraSplit';
import { ScreeningPopulationButtons } from './containers/Buttons';
import ScreeningPopulationDeleteUserButton from '../Buttons/components/Population/deleteUser';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import ScreeningView from '../View';



const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'responded', label: <FormattedMessage {...DefaultI18nEn.filterResponded} /> },
    { value: 'opened', label: <FormattedMessage {...DefaultI18nEn.filterOpened} /> },
    { value: 'unopened', label: <FormattedMessage {...DefaultI18nEn.filterUnOpened} /> },
];
 
const ScreeningPopulation = props => {
    const {population=[], total, screening} = props; 

    const extra = <React.Fragment>
            <CardExtraSplit>
                <CardQuickFilter  filters={filters} value={props.activityStatus || 'all'} onChange={props.loadByStatus} />
            </CardExtraSplit>
            <CardExtraSplit>
                <ScreeningPopulationUserManagerButton refetch={props.refetch} screening={screening} icon={'plus'} size={'small'} />
            </CardExtraSplit>
</React.Fragment>;

    // SELECTED 
    const { selectedRowKeys } = props;
    const rowSelection = {
      selectedRowKeys,
      onChange: props.onSelectedRowKeysChange,
    };


    const columns = [{
        title: 'Name',
        // dataIndex: 'name',
        key: 'name',
        render: info => <AvatarWithName user={info.user} />
    },
    {
        title: 'Age',
        // dataIndex: 'name',
        key: 'age',
        render: info => info.user.age
    },
    {
        title: 'Gender',
        // dataIndex: 'name',
        key: 'gender',
        render: info => info.user.gender
    },
    {
        title: 'Completed on',
        dataIndex: 'acceptedOn',
        key: 'acceptedOn',
        render: data => data && moment(data).format('l')
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        render: score => score && score+'%'
    },
    {
        title: '',
        key: 'act',
        width:50,
        render: (info) => {
            const items = [
                {key:'delete', content:  <ScreeningPopulationDeleteUserButton screeningUser={info} />},
                // {key:'delete', content: <TransitionDeleteButton user={user} transition={info} onDelete={props.refetch} asMenuItem />}
            ];
            return <SettingsDropdown items={items} />
        }
        }];

    return <>
    <Card type={'pure1'}><ScreeningView screening={screening} /></Card>
    <Card type={'table'} 
    extra={extra}
>
        <TableWithMessage
        emptyMessage={'No Screening Population'}
        dataSource={population} 
        columns={columns}
        total={total}
        rowSelection={rowSelection}
        onChange={props.handleTableChange}
        showFooter={true} 
        rowKey={'id'}
        buttons={<ScreeningPopulationButtons selectedRowKeys={selectedRowKeys} dataSource={population}  />}
        />
        </Card>
        </>
}

export default ScreeningPopulation;
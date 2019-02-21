import React from 'react';
import {Card, Tooltip,  Button, Icon, Radio, Table} from 'antd';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import PatientAdvocateManagerButton from './components/Buttons/components/Manager';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../i18n/en';
import { TableWithMessage } from '../../../../../../components/Tables';
import { PatientAdvocateDeleteButton } from './components/Manager/containers/DeleteButton';
import { getTableDateProps } from '../../../../../../components/Tables/TableColumn';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'pending', label: <FormattedMessage {...DefaultI18nEn.filterPending} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const PatientAdvocatesTable = props => {

    const {users = [], status, loading = false, user} = props;
    const total = users.length;
    const columns = [{
            title: 'Name',
            dataIndex: 'user',
            key: 'name',
            render: (user, info) => {
                if (!user) {
                    return info.email;
                }
                return <AvatarWithName user={user}/>
            }
        },
        // {
        //     title: 'Role',
        //     dataIndex: 'roleText',
        //     key: 'role',
        //     // render: (info) => {
        //     //     return info;
        //     // },
        // },
        {
            title: 'On',
            key: 'joinedDate',
            ...getTableDateProps('joinedDate'),
        },
        {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    // {key:'edit', content:  <CampaignManagerButton button={false} label={'Edit'} campaign={info} asMenuItem />},
                    {key:'delete', content: <PatientAdvocateDeleteButton advocate={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
        }

    ];
    const dataSource = users;
    
 






    return (<PageHeaderLayout title={'Advocates ' + (total > 0 ? ' (' + total + ')' : '')}
                              content=""
                              action={<CardExtraItems>
                                <CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
                                <PatientAdvocateManagerButton user={user} icon={'plus'} refetch={props.refetch} />
                                </CardExtraItems>}
    >
        <Card type="table">
            <TableWithMessage
            emptyMessage={'No Advocates'}
            size="middle" 
            dataSource={dataSource} 
            rowKey={'id'} 
            columns={columns} 
            total={total}
            loading={loading} />
        </Card>
    </PageHeaderLayout>)
}

export default PatientAdvocatesTable;
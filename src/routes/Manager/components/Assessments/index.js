import { Card, Icon, Tag, Tooltip } from 'antd';
import React from 'react';
import Truncate from 'react-truncate';
import { FormattedMessage } from 'react-intl';
import { CardExtraSplit } from '../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../components/Card/components/CardQuickFilter';
import { PageHeaderLayout } from "../../../../components/Layout/PageHeaderLayout/index";
import { TableWithMessage } from '../../../../components/Tables';
import { getTableDateProps } from '../../../../components/Tables/TableColumn';
import TaskAssignButton from '../../../../components/Tasks/components/TaskAssignButton';
import SettingsDropdown from '../../../../components/UI/SettingsDropdown';
import DefaultI18nEn from '../../../../i18n/en';
import { AssessmentManagerButton } from './components/Buttons/components/Manager';
import { AssessmentDeleteButton } from './components/Buttons/containers/Delete';

 
const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'published', label: <FormattedMessage {...DefaultI18nEn.filterPublished} /> },
    { value: 'pending', label: <FormattedMessage {...DefaultI18nEn.filterPending} /> },
    { value: 'private', label: <FormattedMessage {...DefaultI18nEn.filterPrivate} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const Assessments = props => {
    const {assessments = [],openModal,visibleModal,hideModal, total,searchText,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/> 
    const suffixCode = searchTextCode ? <Icon type="close-circle-o" onClick={emitEmptyCode}/> : <Icon type="search"/> 
    const columns = [
        {
            title: 'Title',
            key: 'name',
            render: (info) => <AssessmentManagerButton assessment={info} label={info.name} />
        },
        {
            title: 'Notes',
            dataIndex: 'description',    
            key: 'name',
            width:200,
            render: (info) => <Truncate width={180}>{info}</Truncate>
        },
        {
            title: 'Status',
            key: 'status',
            width:100,
            render: assessment => {
                let color = '';
                const status = assessment.status;
                switch(status) {
                    case 'private':
                        //color = 'red';
                    break;
                    case 'published':
                        color = 'green';
                    break;
                }
                return <Tag color={color} style={{marginLeft:5}}>{status}</Tag>;
            }
        },
        {
            title: 'Created',
            key: 'createdDate',
            ...getTableDateProps('createdDate'),
        },
        // {
        //     title: 'Created Date',
        //     dataIndex: 'createdDate',    
        //     key: 'createdDate',
        //     render: (info) => moment(info).format('L'),
        //     sorter: (a, b) => a.createdDate - b.createdDate,
        // },
        {
            title: '# Prescribed',
            dataIndex: 'getTotalAssigns',    
            key: 'getTotalAssigns',
            width:160,
            sorter: (a, b) => a.getTotalAssigns - b.getTotalAssigns,
        },
        {
            render: (info) => {
                const items = [
                    {key:'edit', content:  <AssessmentManagerButton assessment={info} />},
                    {key:'assign', content:  <TaskAssignButton label={'Prescribe'} asMenuItem size={'default'} mode={'simple'} assignObject={{type: 'assessment', object:info}} />},
                    {key:'delete', content: <AssessmentDeleteButton assessment={info} refetch={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            },
            width:50
        }
    ];
   
    const actions = <React.Fragment>
        <CardExtraSplit>
				<CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            </CardExtraSplit>
            <CardExtraSplit>
            <Tooltip title="Invite"><AssessmentManagerButton refetch={props.refetch} /></Tooltip>
            </CardExtraSplit>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Assessments ' + (total > 0 ? ' (' + total + ')' : '')}
                          action={actions}
        >

            <Card type="table">
                <TableWithMessage
                emptyMessage={'No Assessments'}
                size="middle" 
                dataSource={assessments} 
                rowKey={'id'} 
                columns={columns}
                total={total} 
                loading={loading}/>
            </Card>
        </PageHeaderLayout>
    );
}
// const enhance = compose(
//     withState('visibleModal', 'setOpenManager', false),
//     withHandlers({
//         openModal: props => () => {
//             props.setOpenManager(true);
//         },
//         hideModal: props => () => {
//             props.setOpenManager(false);
//         }
//     }),
// );

export default (Assessments);
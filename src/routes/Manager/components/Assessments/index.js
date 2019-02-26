import React from 'react';
import {Table,Menu,Tooltip,Button, Dropdown, Radio, Card, Input, Icon, Tag} from 'antd';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../components/Tables/sort';
import AssessmentsEditor from "./containers/AssessmentsEditor";
import { AssessmentViewButton } from './containers/AssessmentViewButton';
import { TableWithMessage } from '../../../../components/Tables';
import { getTableDateProps } from '../../../../components/Tables/TableColumn';
import DefaultI18nEn from '../../../../i18n/en';
import { CardExtraSplit } from '../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../components/Card/components/CardQuickFilter';
import { FormattedMessage } from 'react-intl';
import { AssessmentManagerButton } from './components/Buttons/components/Manager';

 
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
            title: 'Name',
            dataIndex: 'name',    
            key: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            render: assessment => {
                let color = 'magenta';
                const status = assessment.status;
                switch(status) {
                    case 'private':
                        color = 'red';
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
            title: 'Total Assigns',
            dataIndex: 'getTotalAssigns',    
            key: 'getTotalAssigns',
            width:160,
            sorter: (a, b) => a.getTotalAssigns - b.getTotalAssigns,
        },
        {
            render: (info) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <AssessmentManagerButton assessment={info} />
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="delete"/> Delete
                        </Menu.Item>
                    </Menu>
                );
                return <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="setting"/>
                </Dropdown>;
            },
            width:50
        }
    ];
   
    const actions = <React.Fragment>
        <CardExtraSplit>
				<CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            </CardExtraSplit>
            <CardExtraSplit>
            {/* <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip> */}
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
            {visibleModal && <AssessmentsEditor onHide={hideModal}/>}
        </PageHeaderLayout>
    );
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        }
    }),
);

export default enhance(Assessments);
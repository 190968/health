import { Button, Card, Icon, Radio, Tooltip } from 'antd';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { PageHeaderLayout } from "../../../../components/Layout/PageHeaderLayout/index";
import { TableWithMessage } from '../../../../components/Tables';
import DoctorManager from './containers/DoctorManager';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Doctors = props => {
    const {getDoctors = [], total,visibleModal,hideModal,searchText,openModal,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode,searchTextPhone,emitEmptyPhone,onSearchPhone, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/> 
    const suffixCode = searchTextCode ? <Icon type="close-circle-o" onClick={emitEmptyCode}/> : <Icon type="search"/> 
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'firstName',    
            key: 'firstName',
            render: (firstName,data) => {
                return <span>{data.firstName} {" "}{data.lastName}</span>;
            },
        },
        {
            title: 'NPI',
            dataIndex: 'npi',    
            key: 'npi',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneFormatted',    
            key: 'phoneFormatted',
        }
    ];
    
    const actions = <React.Fragment>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Doctors ' + (total > 0 ? ' (' + total + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <TableWithMessage
                 
                 dataSource={getDoctors} rowKey={'id'} columns={columns}
                       total={total} loading={loading}/>
            </Card>
            {visibleModal && <DoctorManager onHide={hideModal}/>}
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

export default enhance(Doctors);
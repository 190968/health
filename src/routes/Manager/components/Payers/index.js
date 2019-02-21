import React from 'react';
import {Table,Tooltip,Button, Radio, Card, Input, Icon} from 'antd';

import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../components/Tables/sort';
import PayersManager from './containers/PayersManager.js'
import { TableWithMessage } from '../../../../components/Tables';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Payers = props => {
    const {getPayers = [], total, visibleModal,openModal,hideModal,totalCount,searchText,emitEmpty,onSearch,searchTextCode,emitEmptyCode,onSearchCode, loading = false} = props;
    const suffix = searchText ? <Icon type="close-circle-o" onClick={emitEmpty}/> : <Icon type="search"/> 
    const suffixCode = searchTextCode ? <Icon type="close-circle-o" onClick={emitEmptyCode}/> : <Icon type="search"/> 
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',    
            key: 'name',
             
        
        },
        {
            title: 'HP Сode',
            dataIndex: 'code',    
            key: 'code',
            
        },
    ];
     
 
    const actions = <React.Fragment>
         
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;

    return (
        <PageHeaderLayout title={'Payers ' + (total > 0 ? ' (' + total + ')' : '')}
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <TableWithMessage 
                dataSource={getPayers} rowKey={'id'} columns={columns}
                       total={total} loading={loading}/>
            </Card>
            {visibleModal && <PayersManager onHide={hideModal}/>}
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

export default enhance(Payers);
import React, {useState, useEffect} from 'react';
import {Table, Drawer} from 'antd';
import { EmptyList } from '../Loading';

export const TableWithMessage = props => {
   
    const {emptyMessage='Nothing has been added', buttons, showEmpty=true, ...otherProps } = props;
    const {dataSource=[], loading, total, rowSelection} = otherProps;
    
    let {pagination={}} = otherProps;
    const {selectedRowKeys=[]} = rowSelection || {};
    // console.log(props);

    if (pagination !== false) {
        pagination.hideOnSinglePage = true;
        pagination.showSizeChanger = true;
        // pagination.pageSize = dataSource.length;
        pagination.showTotal= (total, range) => `${range[0]}-${range[1]} of ${total} `;
        pagination.size = "small";
        if (total) {
            pagination.total = total;
        }
    }
    let footer = null;
    if (selectedRowKeys.length > 0) {
        footer = () => buttons;
    }
    // console.log(pagination);
    // console.log(dataSource);
    // console.log(loading, 'loading');

    if (dataSource.length == 0 && !loading && showEmpty) {
        if (!emptyMessage) {
            return null;
        }
        return <EmptyList >{emptyMessage}</EmptyList>;
    }

   
    return (
    <React.Fragment>        
        <Table        
        {...otherProps}
        pagination={pagination}
        footer={footer}
         /> 
        
    </React.Fragment>
    )
}
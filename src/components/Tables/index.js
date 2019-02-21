import React from 'react';
import {Table} from 'antd';
import { EmptyList } from '../Loading';

export const TableWithMessage = props => {
    const {emptyMessage='Nothing has been added', buttons, ...otherProps } = props;
    const {dataSource=[], loading, total, rowSelection} = otherProps;
    let {pagination={}} = otherProps;
    const {selectedRowKeys=[]} = rowSelection || {};


    if (pagination !== false) {
        pagination.hideOnSinglePage = true;
        pagination.showSizeChanger = true;
        // pagination.pageSize = dataSource.length;
        pagination.showTotal= (total, range) => `${range[0]}-${range[1]} of ${total} patients`;
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

    if (dataSource.length == 0 && !loading) {
        if (!emptyMessage) {
            return null;
        }
        return <EmptyList>{emptyMessage}</EmptyList>;
    }
    return <Table
    {...otherProps}
    pagination={pagination}
    footer={footer}
    /> 
}
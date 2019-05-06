import React from 'react';
import {List} from 'antd';
import { EmptyList } from '../../Loading';

export const ListWithMessage = props => {
    const {emptyMessage='Nothing has been added', ...otherProps } = props;
    const {dataSource=[], loading, header} = otherProps;
    if (!loading && (!dataSource || dataSource.length == 0)) {
        if (!emptyMessage) {
            return null;
        }
        return <EmptyList>{emptyMessage}</EmptyList>;
    }
    return <List
    {...otherProps}
    /> 
}
import React from 'react';
import {List} from 'antd';
import { EmptyList } from '../../Loading';

export const ListWithMessage = props => {
    const {emptyMessage='Nothing has been added', noImage=false, ...otherProps } = props;
    const {dataSource=[], loading, header} = otherProps;
    if (!loading && (!dataSource || dataSource.length == 0)) {
        if (!emptyMessage) {
            return null;
        }
        return <EmptyList noImage={noImage}>{emptyMessage}</EmptyList>;
    }
    return <List
    {...otherProps}
    /> 
}
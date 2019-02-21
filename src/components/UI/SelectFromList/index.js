import React from 'react';
import {Card} from 'antd';
import { withHandlers } from 'recompose';

export const SelectFromList = props => {
    const {items=[],  ...otherProps} = props;
    const {rowKey='id'} = otherProps;

    return <Card type={'pure'} bordered={false}>{items.map(item => {
        return <SelectItemItem key={item[rowKey]} item={item} {...otherProps} />;
    })}</Card>
}

const SelectItemItemPure = props => {
    const {item} = props;
    return <Card.Grid style={{width: '100%', cursor:'pointer'}} onClick={props.onSelect}>{item.label}</Card.Grid>;
}

const SelectItemItem = withHandlers({
    onSelect: props => () => {
        const {item, rowKey='id', onSelect} = props;
        onSelect(item[rowKey]);
    }
})(SelectItemItemPure);
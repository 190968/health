import React from 'react';
import {Card} from 'antd';
import { withHandlers } from 'recompose';
import './index.less';

let gridStyle = {
    //width: '50%',
    textAlign: 'center',
    minHeight:50,
    cursor: 'pointer'
};

export const SelectFromList = props => {
    const {items=[], ...otherProps} = props;
    const {rowKey='id'} = otherProps;

    return <Card type={'pure1'} className={'select-item ant-card-contain-grid'} bordered={true}>{items.map(item => {
        return <SelectItemItem key={item[rowKey]} item={item} {...otherProps} />;
    })}</Card>
}

const SelectItemItemPure = props => {
    const {item, cols=1, labelKey} = props;
    let {label, icon} = item || {};
    if (labelKey) {
        label = item[labelKey] || label;
    }
    const style = cols > 1 ? gridStyle : {width: '100%', cursor:'pointer'};
    return <Card.Grid style={style} onClick={props.onSelect}>{icon && <div className={'icon'}>{icon}</div>}{label}</Card.Grid>;
}

const SelectItemItem = withHandlers({
    onSelect: props => () => {
        const {item, rowKey='id', onSelect} = props;
        onSelect(item[rowKey]);
    }
})(SelectItemItemPure);
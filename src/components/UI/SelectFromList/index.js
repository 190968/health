import React from 'react';
import {Card} from 'antd';
import { withHandlers } from 'recompose';
import './index.less';
import { SideToSide } from '../../Layout/Flexbox';

const gridStyle = {
    //width: '50%',
    textAlign: 'center',
    minHeight:50,
    cursor: 'pointer'
};

export const SelectFromList = props => {
    const {items=[], ...otherProps} = props;
    const {rowKey='id', cols} = otherProps;

    return <Card type={'pure1'} className={'select-item ant-card-contain-grid'} bordered={true}>{items.map(item => {
        return <SelectItemItem key={item[rowKey]} item={item} {...otherProps} />;
    })}</Card>
}

const SelectItemItemPure = props => {
    const {item, cols=1, labelKey, inline=false} = props;
    let {label, icon, disabled=false} = item || {};
    if (labelKey) {
        label = item[labelKey] || label;
    }
    let style = cols > 1 ? {...gridStyle, textAlign: (inline?'left':'center'), width: Math.round(100/cols)+'%'} : {width: '100%', cursor:'pointer'};
    if (disabled) {
        style.cursor = 'not-allowed';
    }
    return <Card.Grid style={style} className={disabled && 'disabled'} onClick={props.onSelect}>
        {inline ? <> <SideToSide>
        {icon && <div className={'icon'} style={{marginRight:10}}>{icon}</div>}
        {label}
        </SideToSide></> : <>{icon && <div className={'icon'}>{icon}</div>}{label}</>}
    
    </Card.Grid>;
}

const SelectItemItem = withHandlers({
    onSelect: props => () => {
        const {item, rowKey='id', onSelect} = props;
        const {disabled} = item;
        if (disabled) {
            return;
        }
        onSelect(item[rowKey]);
    }
})(SelectItemItemPure);
import React from 'react';
import { Radio } from 'antd';
import './index.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export const CardExtraSplit = props => {
    const {children, style} = props;
    return <div className={'ant-card-extra-split'} style={style}>{children}</div>;
}

export const CardExtraItems = props => {
    const {children=[]} = props;
    // console.log(children);
    if (Array.isArray(children)) {
        return children && children.map((item, i) => <CardExtraSplit key={i}>{item}</CardExtraSplit>);
    } else {
        return children;
    }
    
}

import React from 'react'
import {Select} from 'antd';
const Option = Select.Option;
// import Select from '../Select';

const ObjectSelectPure = (props) => {
    const {loading=true, items=[], doSearch, onChange, value=undefined, labelInValue, ...otherProps} = props;
    // console.log(props);
    // const {id:valueId} = value || {};
    // return <Select {...otherProps} labelInValue value={value} getFullInfo={getFullInfo} i18n={{placeholder:"Select"}} loading={loading} items={items} onChange={onChange} />;
    return <Select value={value} style={{width:'100%'}} onChange={onChange} labelInValue={labelInValue}>
        {items.map(item => <Option key={item.key}>{item.label}</Option>)}
    </Select>
};


export default ObjectSelectPure;
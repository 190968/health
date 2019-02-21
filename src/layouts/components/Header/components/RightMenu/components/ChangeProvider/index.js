import React from 'react';
import {Select, Tooltip, Icon} from 'antd';

const Option = Select.Option;

const ChangeProvider = props => {
    const {currentUser, currentProvider,  changeProvider} = props;
    const {possibleProviders={}} = currentUser || {};
    if (possibleProviders.length === 0) {
        return null;
    }

    const selectedProvider = currentProvider ? currentProvider.id : 0;

    return <React.Fragment>
        
        <Select onSelect={changeProvider} showSearch defaultValue={selectedProvider} style={{ width: 200 }} placeholder={'Select Provider'}>
        <Option value={0}>Network Level</Option>
        {possibleProviders.map(provider => <Option key={provider.id} value={provider.id}>{provider.name}</Option>)}
    </Select>
    <Tooltip title={'Here you can switch between network and provider level '}><Icon type="info-circle" theme="outlined" style={{marginLeft:5,color:'#ccc'}} /></Tooltip>
    </React.Fragment>;
}

export default ChangeProvider;
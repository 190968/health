import React from 'react';
import {List} from 'antd';
import { ListWithMessage } from '../../../../../UI/List';
import { BrahmsRuleManagerButton } from '../Buttons/components/Brahms';

 
const BrahmsAsField = props => {
    const { value:brahms, loading} = props; 
 
    return <> 
    <ListWithMessage
        emptyMessage={false}
        itemLayout="horizontal"
        size={'small'}
        loading={loading}
        dataSource={brahms}
        renderItem={(brahmsItem, i) => {
            return <List.Item key={i} >11111</List.Item>
        }} 
    />
    <BrahmsRuleManagerButton />
    </>
}

export default BrahmsAsField;
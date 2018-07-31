import React from 'react';
import {Card, Input} from 'antd';

export const PlanstoreSearch = props => {
    return <div style={{marginBottom: 24}}>
    <Card bordered={false} type={'pure'} >
        <Input.Search
        placeholder={'Search here'}
            // onKeyUp={this.search}
            // defaultValue={search}
            size="large"
            enterButton
        />
    </Card>
</div>;
}

export default PlanstoreSearch;
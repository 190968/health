import React from 'react';
import {Card, List} from 'antd';
import EllipsisText from 'react-ellipsis-text';
import PubMedLogo from  './PubMed.png';
const News = props => {
    const {items=[]} = props;

    return <Card title="News" extra={<img src={PubMedLogo} style={{width:60}} />} type="basic1">
        <List
            size="small"
            dataSource={items}
            renderItem={item => (<List.Item>
                <List.Item.Meta
                    title={item.title}
                    description={ <EllipsisText text={item.textPure} length={25}  />}
                /></List.Item>)}
        />
    </Card>
}

export default News;
import React from 'react';
import {Card, List} from 'antd';
import Truncate from 'react-truncate';
import PubMedLogo from  './PubMed.png';
import PubMedArticlesButton from '../../../../../../../Health/components/PubMedArticles/containers/PubMedArticlesButton';
const News = props => {
    const {items=[]} = props;

    return <Card title="News" extra={<PubMedArticlesButton label={<img src={PubMedLogo} style={{width:60}} />} search={'Small Cell Lung Cancer'} />} type="basic1">
        <List
            size="small"
            dataSource={items}
            itemLayout={'vertical'}
            renderItem={item => (<List.Item>
                <List.Item.Meta
                    title={item.title}
                    // title={'These Are the Best (and Worst) Diets of 2017, According to U.S. News'}
                    description={ <Truncate lines={1} >{item.textPure}</Truncate>}
                /></List.Item>)}
        />
    </Card>
}

export default News;
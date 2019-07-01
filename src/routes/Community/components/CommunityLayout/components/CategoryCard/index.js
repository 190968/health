import React from 'react';
import { Tooltip, Card, Icon } from 'antd';
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate';
import './index.less';
const { Meta } = Card;

const CategoryCard = props => {
    const {item, asLink} = props;
    if (asLink) {
        return(
            <Link to={"/community/"+item.id}>
                <Icon type="star" theme="filled" style={{color: 'orange'}} /> {item.name}
            </Link>
        );
    }
    return(
        <Link to={"/community/"+item.id}>
            <Card type="community"
                cover={<img alt={item.name} style={{maxHeight:150}} src={item.thumb.large} />}
            >
                <Meta title={<Tooltip title={item.name}><Truncate line={2}>{item.name}</Truncate></Tooltip>} />

            </Card>
        </Link>
    );
}
export default CategoryCard;
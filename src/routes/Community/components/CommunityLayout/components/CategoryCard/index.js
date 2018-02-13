import React from 'react';
import { Tooltip, Card } from 'antd';
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate';

export default class CategoryCard extends React.PureComponent {
    render(){
        const {item} = this.props;

        return(
            <Link to={"/community/"+item.id}>
                <Card
                    cover={<img alt={item.name} style={{maxHeight:120}} src={item.thumb.large} />}
                >
                    <Tooltip title={item.name}><Truncate line={1}>{item.name}</Truncate></Tooltip>
                </Card>
            </Link>
        )
    }
}
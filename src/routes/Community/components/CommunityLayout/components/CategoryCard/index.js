import React from 'react';
import { Tooltip, Card } from 'antd';
import { Link } from 'react-router-dom'

export default class CategoryCard extends React.PureComponent {
    render(){
        const {item} = this.props;

        return(
            <Link to={"/community/"+item.id}>
                <Card
                    cover={<img alt={item.name} height={120} src={item.thumb.large} />}
                >
                    <Tooltip title={item.name}>{item.name.substring(0, 10)}</Tooltip>
                </Card>
            </Link>
        )
    }
}
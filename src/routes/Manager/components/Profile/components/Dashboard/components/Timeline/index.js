import React from 'react';
import {Card, List, Avatar} from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {TimelineElementView} from "../../../TimelineLayout/components/Timeline/components/TimelineElement/index";

const TimelineWidget = props => {
    const {items=[], user={}, loading} = props;

    return <Card title="Timeline" loading={loading}>
        <List
            size="small"
            dataSource={items}
            renderItem={item => {
                const {body, color, activityText, image, icon, progress, title, createdAt} = TimelineElementView(item);
                //console.log(item);
                return <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: color }}>{icon}</Avatar>}
                        title={<Link to={'/u/'+user.id+'/timeline'}>{title}</Link>}
                        description={moment(createdAt).format('lll')}
                    />
                </List.Item>
            }}
        />
    </Card>
}

export default TimelineWidget;
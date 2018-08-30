import React from 'react';
import {Card, Row, Col} from 'antd';
import EllipsisText from 'react-ellipsis-text';
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import moment from 'moment';
import { Loading } from '../../../../components/Loading';

const gridStyle = {
    width: '33%',
};

export const TasksList = props => {

    const {tasks = [], loading = false, hideOnEmpty = false} = props;
    const total = tasks.length;
    if (loading) {
        return <Loading />
    }
    if (total === 0 && hideOnEmpty) {
        return null;
    }

    return (<Card title={'Tasks ' + (total > 0 ? ' (' + total + ')' : '')}>
        <Row gutter={8}>
            {tasks.map((task, i) => {

                let color = '#11B76B';
                switch (task.priority) {
                    case 2:
                        color = '#ff5a5f';
                        break;
                    case 1:
                        color = '#FF8805';
                        break;
                }
                return <Col key={i} md={8} style={{paddingBottom:4, paddingTop:4}}>
                    <Card bordered={true} bodyStyle={{borderLeft: '3px solid ' + color, padding: 10}}>
                        <h4>{task.title}</h4>
                        <AvatarWithName user={task.sender} size={'small'}/>

                        <div style={{fontSize: '0.9em', color: '#ccc', position: 'absolute', top: 10, right: 10}}>
                            {moment(task.endDate).format('L')}
                        </div>
                    </Card>
                </Col>;
            })}
        </Row>
    </Card>)
}

export default TasksList;
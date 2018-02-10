import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Progress} from 'antd';
import {Circle } from 'rc-progress';

export default class TodoPlanItem extends React.PureComponent {

    render () {

        const {
            plan
        } = this.props;
        return (
            <Link to={'/plan/'+plan.upid} style={{color:'inherit'}}>
            <Row type="flex" justify="space-between" align="top" style={{padding:5}}>
                <Col xs={3} md={2}>
                    <Progress type="circle" showInfo={false} percent={plan.progress}  width={30} />
                    </Col>
                <Col xs={20} md={21} offset={1} style={{paddingTop:3}}>
                    {plan.title}
                </Col>
            </Row></Link>);
    }
}



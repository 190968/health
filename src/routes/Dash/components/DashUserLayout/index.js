import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './containers/TodoList';
import Assessments from "../../../Manager/components/Profile/containers/Assessments";
import PlansList from '../../../Plan/containers/PlansList';
import MedicationPlan from '../../../Plan/components/MedicationPlan/containers';
import BiometricPlan from '../../../Plan/components/BiometricPlan/containers';
import CalendarWidget from '../../../Calendar/components/Widget';


import {Icon, Alert, Row, Col,Card } from 'antd';



export class DashUserLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }
    static propTypes = {
        user_id: PropTypes.string,
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render () {
        const {
           loading, date, currentUser
        } = this.props;


        if (loading) {
            //return (<div>Loading...</div>);
            return (
                <Card loading>Loading...</Card>
            );
        }


        return (
           <Row gutter={20}>
               <Col>
                   <Alert
                       style={{marginBottom:24}}
                       message="WELCOME TO YOUR PERSONAL HEALTH DASHBOARD"
                       description="To start reaching your health goals, visit the Planstore to get an ActionPlan or add medications or trackers."
                       type="info"
                       showIcon
                       closeText={<Icon type="close" />}
                   />
               </Col>
               <Col xs={24} md={14} lg={15} xl={17}>
                   <PlansList ready={!loading} date={date} user_id={currentUser.id} list />
                   <MedicationPlan ready={!loading} date={date} user_id={currentUser.id} />
                   <Assessments ready={!loading} date={date} user={currentUser} />
                   <BiometricPlan ready={!loading} date={date} user_id={currentUser.id} />
               </Col>
               <Col xs={24} md={10} lg={9} xl={7}>
                   <TodoList ready={!loading} userId={currentUser.id} date={date} />

                   <CalendarWidget ready={!loading} date={date} user_id={currentUser.id} />

               </Col>
           </Row>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

export default DashUserLayout;



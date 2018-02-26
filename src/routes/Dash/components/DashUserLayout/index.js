import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './containers/TodoList';
import PlansList from '../../../Plan/containers/PlansList';
import MedicationPlan from '../../../Plan/components/MedicationPlan/containers';
import BiometricPlan from '../../../Plan/components/BiometricPlan/containers';
import Motivators from '../../../User/containers/motivatorsContainer';
import CareTeam from '../../../User/containers/careTeamContainer';
import Family from '../../../User/containers/familyContainer';

import { Button,Icon, Alert, Row, Col, Calendar,Card } from 'antd';



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
           loading, date, user_id
        } = this.props;

      //console.log(user);
        if (loading) {
            //return (<div>Loading...</div>);
            return (
                <Card loading>Loading...</Card>
            );
        }
        //console.log(loading, 'Loading');
        //console.log(date);

        return (
           <Row gutter={15}>
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
                   <PlansList ready={!loading} date={date} user_id={user_id} />
                   <MedicationPlan ready={!loading} date={date} user_id={user_id} />
                   <BiometricPlan ready={!loading} date={date} user_id={user_id} />
               </Col>
               <Col xs={24} md={10} lg={9} xl={7}>
                   <TodoList ready={!loading} userId={user_id} date={date} />


                         <Card title="Health Calendar"
                               extra={<Button.Group><Button size={"small"} ><Icon type="calendar" /></Button><Button size={"small"} ><Icon type="plus" /></Button></Button.Group>}
                         >
                             <Calendar fullscreen={false}  />
                         </Card>
                       <Family user_id={user_id} />
                       <CareTeam user_id={user_id} />
                       <Motivators user_id={user_id} />

               </Col>
           </Row>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

export default DashUserLayout;



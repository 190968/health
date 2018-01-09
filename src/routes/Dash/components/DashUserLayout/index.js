import React from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import PlanWidget from '../../../Plan/components/Plan';
import MedicationPlan from 'routes/Plan/components/MedicationPlan/containers';
import BiometricPlan from 'routes/Plan/components/BiometricPlan/containers';
import Motivators from '../../../User/containers/motivatorsContainer';
import CareTeam from '../../../User/containers/careTeamContainer';

import { Row, Col, Calendar, List,Card } from 'antd';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';


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
            plans, loading, medicationPlan, date, user_id
        } = this.props;

      //console.log(user);
        /*if (loading) {
            //return (<div>Loading...</div>);
            return (
                <center>
                    <div  className='my-awesome-placeholder'>
                        <ReactPlaceholder type='text'  rows={6} color='#E0E0E0'>
                        </ReactPlaceholder>
                    </div>
                </center>
            );
        }*/
        //onsole.log("Logkout");
        //console.log(date);
        const pageOpts = { total: 4, hideOnSinglePage:true};
        return (
           <Row gutter={15}>
               <Col xs={24} md={16} lg={18}>
                   <Card title={<FormattedMessage id="plan.medicationpan.medication.card.title2" defaultMessage="TODAY'S ACTIONPLANS" description="Medications for Today" />}>
                   <List
                       split={false}
                       loading={loading}
                       grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                       pagination={pageOpts}
                       dataSource={plans}
                       renderItem={product => (
                           <List.Item key={product.id}>
                               <PlanWidget info={product} key={product.id}/>
                           </List.Item>
                       )}
                   />
                       </Card>
                   <div style={{marginTop:10}}><MedicationPlan loading={loading} date={date} user_id={user_id} /></div>
               <div style={{marginTop:10}}><BiometricPlan loading={loading} date={date} user_id={user_id} /></div>
               </Col>
               <Col xs={24} md={8} lg={6}>
                   <Motivators />

                   <div style={{marginTop:10}}>
                       {/*<CareTeam />*/}
                   </div>
                       <div style={{marginTop:10}}>
                         <Card>
                             <Calendar fullscreen={false}  />
                         </Card>
                   </div>
               </Col>
           </Row>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

export default DashUserLayout;



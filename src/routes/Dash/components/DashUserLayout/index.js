import React from 'react';
import {withRouter} from 'react-router-dom'
import Joyride from 'react-joyride';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import moment from 'moment';
import TodoList from './containers/TodoList';
import Assessments from "../../../Manager/components/Profile/containers/Assessments";
import PlansList from '../../../Plan/containers/PlansList';
import MedicationPlan from '../../../Plan/containers/MedicationPlan';
import BiometricPlan from '../../../Plan/containers/BiometricPlan';
import BiometricPlanOld from '../../../Plan/components/BiometricPlan/containers';
import CalendarWidget from '../../../Calendar/components/Widget';
import MedicationPlanOld from '../../../Plan/components/MedicationPlan/containers';

import {Icon, Alert, Row, Col,Card } from 'antd';
import UserAppointments from '../../../Calendar/containers/Appointments';
import UserHealthTable from '../../../Health/containers/UserHealthTable';
import Motivators from '../../../User/containers/motivatorsContainer';
import Family from '../../../User/containers/familyContainer';
import { UserReferrals } from '../../../User/containers/UserReferrals';
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';
import CareTeam from '../../../User/containers/careTeamContainer';
import { compose, withHandlers, withProps } from 'recompose';


const steps = [
    {
      target: '.my-first-step',
      content: 'The Dashboard will show all Activities the patient needs to report on that day',
      disableBeacon: true,
    },
    {
      target: '.tour-appointments',
      content: 'Patients can manage their upcoming appointments as well as request video or in-person meetings with members of their care team',
      disableBeacon: true,
      placement: 'left'
    },
    {
        target: '.tour-meds',
        content: 'Patients can manage all their medications on their dashboard and set up reminders on when they need to report',
        disableBeacon: true,
    },
    {
        target: '.tour-trackers',
        content: 'Patients can  also report on any necessary biometric or vital sign trackers and can connect to bluetooth devices to make reporting easier and more efficient',
        disableBeacon: true,
    },
    {
        target: '.tour-careteam',
        content: 'All of the members of a patient care team will be visible on the patient\'s dashboard, including their Care Team, Motivators, and Family Members ',
        disableBeacon: true,
        placement: 'left'
    },
    {
        target: '.tour-planstore',
        content: 'Patients can visit the Plan Store to browse and download additional ActionPlans',
        disableBeacon: true,
        url: '/planstore?tour=1'
    },
  ];

//   const callback = props => {
//       console.log(props);
//       const {action, index} = props;
//       if (action === 'update') {
//         const step = steps[index] || null;
//         console.log(step);
//       }
//   }
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
        
        //console.log(loading);
        if (loading) {
            //return (<div>Loading...</div>);
            return (
                <Card loading>Loading...</Card>
            );
        }
        //console.log(date, 'Dash Date');
        return (
           <Row gutter={20}>
               <Col>
                   <Alert
                       style={{marginBottom:24}}
                       message={<FormattedMessage {...messages.userDashTitle} />}
                       description={<FormattedMessage {...messages.userDashText} />}
                       type="info"
                       showIcon
                       closeText={<Icon type="close" />}
                   />
               </Col>
               <Col xs={24} md={14} lg={15} xl={17} className={'my-first-step'}>
               {this.props.showTour && <Joyride
                steps={steps}
                continuous
                disableOverlayClose
                run
                callback={this.props.callback}
                disableCloseOnEsc={true}
                styles={{
                    options: {
                         
                        primaryColor: '#A5C943',

                        // buttonNext: {
                        //     backgroundColor: '#A5C943',
                        // }
                       
                      },
                    //   backgroundColor: '#A5C943',


                }}
                />}
                   <PlansList date={date} user={currentUser} />
                   <MedicationPlan  date={date} user={currentUser} />
                   {/* <MedicationPlanOld ready={!loading} date={date} user_id={currentUser.id} user={currentUser} /> */}
                   <Assessments ready={!loading} date={date} user={currentUser} />
                   <BiometricPlan ready={!loading} date={date} user={currentUser} />
                   {/* <BiometricPlanOld ready={!loading} date={date} user_id={currentUser.id} /> */}
                   <UserHealthTable user={currentUser} />
               </Col>
               <Col xs={24} md={10} lg={9} xl={7}>
                    <UserAppointments user={currentUser} />
                    <UserReferrals user={currentUser} />
                    <div className={'ant-card tour-careteam'} >
                        <CareTeam user={currentUser} />
                        <Motivators user={currentUser} />
                        <Family user={currentUser} />
                    </div>
               </Col>
           </Row>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

const enhance = compose(
    withRouter,
    withHandlers({
        callback: ownProps => (props) =>  {
            console.log(ownProps);
           const {action, index} = props;
           const { history} = ownProps;
           console.log(props);
           if (action === 'update') {
             const step = steps[index] || null;
             console.log(step);
             const {url} = step || {};
             if (url) {
               history.push(url);
             }
           }
       },
    }),
    withProps(props => {
        const {location} = props;
        const {search} = location || {};
        var parsedUrl = queryString.parse(search);
        const {tour} = parsedUrl || {};
        return {
            showTour: tour === '1'
        }

    }),
);
export default enhance(DashUserLayout);



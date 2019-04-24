import React from 'react';
import {Row, Col, Card} from 'antd';
import {EmptyList} from "../../../../../../components/Loading";
import {DiagnosesList} from "../../../../../Health/containers/Diagnoses";
import Vitals from "./containers/Vitals";
import Stages from "./containers/Stages";
import ActionPlans from "./containers/ActionPlans";
import HealthItems from "./containers/HealthItems";
import Tumorboards from "./containers/Tumorboards";
import News from "./containers/News";
import Timeline from "./containers/Timeline";
import Genomics from "./components/Genomics";
import FamilyHistory from "./containers/FamilyHistory";
import Tasks from "./containers/Tasks";
import UserAppointments from '../../../../../Calendar/containers/Appointments';
import ProfileAdherence from './components/Adherence';
import ProfileMainInfo from './components/ProfileMainInfo';
import UserAssessments from '../../containers/Assessments';
import PatientCohorts from '../../containers/Cohorts';
import UserPrograms from '../../containers/Programs';
import UserQualityMeasures from '../../containers/QualMeasures';

const Overview = props => {
    console.log(props);
    const {user={}, currentUser} = props;
    const {id:userId} = user;
    const {currentRole} = currentUser || {};

    // if (currentRole === 'advocate') {
    //     return <ProfileDashRoleAdvocate {...props} />
    // }
    return <React.Fragment>
        <Row gutter={24}>
            <Col xl={17}>
                       
                <Row  style={{marginBottom:16}}>
                    <Col>
                        <ProfileMainInfo user={user} />
                        <Vitals user={user} />
                        <Tasks user={user} />
                        <Stages user={user} />
                        <UserAssessments user={user} />
                        <UserPrograms user={user} />
                        <UserQualityMeasures user={user} />
                        <PatientCohorts user={user} />
                    </Col>
                </Row>

                <Row gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        {/* <HealthItems user={user} title="Diagnosis" type="diagnosis" /> */}
                        {/* <Genomics user={user} /> */}
                        <HealthItems user={user} title="Clinical Trials" type="clinical_trial" />
                    </Col>
                    <Col lg={12}>
                        <HealthItems user={user} title="Treatments" type="treatment" />
                        <Tumorboards user={user} />
                        {/* <HealthItems user={user}  title="Medications" type="medication" /> */}
                        {/* <FamilyHistory user={user} /> */}
                    </Col>
                </Row>
                 
            </Col>
            <Col xl={7}>
                <ProfileAdherence user={user} />
                <Timeline user={user} isWidget />
                <UserAppointments user={user} />
                <News user={user} />
            </Col>
        </Row>
    </React.Fragment>
}

export default Overview;
import React from 'react';
import {Row, Col, Card} from 'antd';
import HealthItems from "../Dashboard/containers/HealthItems";
import Genomics from "../Dashboard/components/Genomics";
import HealthSideBar from './components/SideBar';
import FamilyHistory from '../Dashboard/containers/FamilyHistory';

const Overview = props => {
    const {user={}} = props;
    return <React.Fragment>
        <Row gutter={16} style={{marginLeft:8}}>
            <Col lg={16}>
                <Row gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <HealthItems user={user} title="Diagnosis" type="diagnosis" />
                        <HealthItems user={user} title="Conditions" type="condition" />
                        <Genomics user={user} />
                        <HealthItems user={user} title="Clinical Trials" type="clinical_trial" />
                        <HealthItems user={user} title="Oncology" type="oncology" />
                        <HealthItems user={user} title="Chemotherapies" type="chemotherapy" />
                        {/* <HealthItems user={user} title="Documents" type="document" /> */}
                        
                    </Col>
                    <Col lg={12}>
                        <HealthItems user={user} title="Allergies" type="allergy" />
                        <HealthItems user={user} title="Med Allergies" type="med_allergy" />
                        <HealthItems user={user} title="Treatments" type="treatment" />
                        {/* <HealthItems user={user} title="Medications" type="medication" /> */}
                        <HealthItems user={user} title="Radiology" type="radiology" />
                        <HealthItems user={user} title="Radiation" type="radiation" />
                        <HealthItems user={user} title="Pathology" type="pathology" />
                        <FamilyHistory user={user} />
                        
                    </Col>
                </Row>
            </Col>
            <Col lg={8}>
                <HealthSideBar user={user} />
            </Col>
        </Row>
    </React.Fragment>
}

export default Overview;
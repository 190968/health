import React from 'react'
import {Row, Col, Card, Icon, Tooltip} from 'antd';
import RiskLevelGraph from './components/RiskLevelGraph';
import MedicationAdherenceGraph from './components/MedicationAdherenceGraph';
import EngagementGraph from './components/EngagementGraph';

const PopulationShapshot = props => {
    const {snapshot={}} = props;
    const {riskLevel=[], medicationAdherence=[], engagement=[]} = snapshot;
    return <Row gutter={24}>
        <Col md={24} xl={10}><Card title="Engagement" extra={<Tooltip title={'Shows Engagement'}><Icon type="info-circle" theme="outlined" style={{color:'#ccc'}} /></Tooltip>}><EngagementGraph items={engagement} /></Card></Col>
        <Col md={14} xl={8}><Card title="Medication Adherence" extra={<Tooltip title={'Shows Medication adherence for the past week'}><Icon type="info-circle" theme="outlined" style={{color:'#ccc'}} /></Tooltip>}><MedicationAdherenceGraph items={medicationAdherence} /></Card></Col>
        <Col md={10} xl={6}><Card title="Risk Level" extra={<Tooltip title={'Shows Patient Risk level'}><Icon type="info-circle" theme="outlined" style={{color:'#ccc'}} /></Tooltip>}><RiskLevelGraph items={riskLevel} /></Card></Col>
        </Row>;
        
}

export default PopulationShapshot;
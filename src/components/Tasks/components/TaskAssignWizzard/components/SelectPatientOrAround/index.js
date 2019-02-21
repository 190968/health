import React from 'react';
import { Card } from 'antd';

const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };
  

const SelectPatientOrAround = props => {
    const {patient, isProviderLevel} = props;
    const {firstName} = patient || {};
    return <Card type={'pure'}>
        <Card.Grid style={gridStyle} onClick={e => props.setAssignMode(4)}>Assign to {firstName}</Card.Grid>
        {!isProviderLevel && <Card.Grid style={gridStyle} onClick={e => props.setAssignMode(3)}>Assign to Provider</Card.Grid>}
        <Card.Grid style={gridStyle} onClick={e => props.setAssignMode(1)}>Assign to Team Member</Card.Grid>
        <Card.Grid style={gridStyle} onClick={e => props.setAssignMode(0)}>Assign to Staff Member</Card.Grid>
        <Card.Grid style={gridStyle} onClick={e => props.setAssignMode(2)}>Assign to Family Member</Card.Grid>

    </Card>
}

export default SelectPatientOrAround;
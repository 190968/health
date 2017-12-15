import React from 'react';
import Medication from './Medication/components';

import { Divider, Card } from 'antd';

export class MedicationPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
        };
    };
    static propTypes = {
    };


    render() {

        const {info} = this.props;
        console.log(this.props);
        const {takeDaily, takeAsNeeded} = info.medicationsByType;

        return (<Card title="Medications for Today">
            <Divider>Take Daily</Divider>
            {takeDaily.map((medication)=> {
                return <Medication key={medication.id} info={medication}  />
            })}
            <Divider>Take As Needed</Divider>
            {takeAsNeeded.map((medication)=> {
                return <Medication key={medication.id} info={medication}  />
            })}
        </Card>)
    }
}



export default MedicationPlanBody

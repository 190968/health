import React from 'react';
import Medication from './Medication/components';
import ReactPlaceholder from 'react-placeholder';

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

        const {info, loading} = this.props;
        if (loading) {
            const info = {medicationsByType: {takeDaily:1, takeAsNeeded:1}};
            return (
                <Card title="Medications for Today">
                <ReactPlaceholder showLoadingAnimation ready={!loading} type="media" rows={5} >
                    a
                </ReactPlaceholder>
                </Card>
            );
        }
        console.log(info);
        const {takeDaily, takeAsNeeded} = info.medicationsByType;


        return (
                <Card title="Medications for Today">
                <Divider>Take Daily</Divider>
                {takeDaily.map((medication)=> {
                    return <Medication key={medication.id} info={medication}  />
                })}
                <Divider>Take As Needed</Divider>
                {takeAsNeeded.map((medication)=> {
                    return <Medication key={medication.id} info={medication}  />
                })}
            </Card>
            )
    }
}



export default MedicationPlanBody

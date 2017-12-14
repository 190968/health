import React from 'react'

import { Divider, Card } from 'antd';

export class Medication extends React.Component {
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
            aaa
            <Divider>Take As Needed</Divider>
        </Card>)
    }
}



export default Medication

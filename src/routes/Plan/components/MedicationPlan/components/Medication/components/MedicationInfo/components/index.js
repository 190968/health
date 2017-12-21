import React from 'react'
import {Icon } from 'antd';
export class MedicationInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
    };
    static propTypes = {
    };


    render() {
        const {drug} = this.props.info;
        const {name, dosage} = drug;
        return (<div>
            <div><Icon type="video-camera" /> {name}</div>
            <div style={{fontSize:'0.8em'}}><Icon type="camera-o" /> {dosage}</div>
        </div>)
    }
}



export default MedicationInfo

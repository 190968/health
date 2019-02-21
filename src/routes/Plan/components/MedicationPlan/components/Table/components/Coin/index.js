import React from 'react';
import {Tooltip, Button} from 'antd';

const MedicationCoin = props => {
        const {isTaken} = props;
        let {quantity} = props;

        // format quantity
        const qs = quantity % 1;//.split('.');
        let q = Math.floor(quantity);
        q = q > 0 ? q : '';

        //const qs = qInfo[1];
        switch (qs) {
            case 0.25:
                quantity = q+'&frac14';
                break;
            case 0.50:
                quantity = q+'&frac12';
                break;
            case 0.75:
                quantity = q+'&frac34';
                break;
            default:break;
        }
        //const hasReport = this.state.isClicked;

        if (isTaken) {
            return (<Tooltip title="Untake"><Button type="primary" size="large" shape="circle" onClick={props.takeMedication} >
                <div  dangerouslySetInnerHTML={{__html: quantity}}></div>
            </Button></Tooltip>)
        }
        return (<Tooltip title="Take"><Button shape="circle" size="large" onClick={props.takeMedication} >
            <div  dangerouslySetInnerHTML={{__html: quantity}}></div>
        </Button></Tooltip>)
}

export default MedicationCoin;
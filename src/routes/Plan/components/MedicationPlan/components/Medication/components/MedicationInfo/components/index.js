import React from 'react'
import ReactHover from 'react-hover'
import {Icon ,Row, Col} from 'antd';

import ModalEdit from '../../MedicationEdit/component'
const options = {
    followCursor:false,
    shiftX: 50,
    shiftY: 40
}
export class MedicationInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
        this.state = { flipped: false };
    };
    static propTypes = {
    };

    mouseOut() {
        console.log("Mouse out!!!");
        this.setState({flipped: false});
    }
    mouseOver() {
        console.log("Mouse over!!!");
        this.setState({flipped: true});
    }
    iconClick() {
        console.log("iconClick");
        //this.setState({flipped: true});
    }
    render() {
        const {drug} = this.props.info;
        const {name, dosage} = drug;
        return (
<div>
    <Row>
        <Col span={2}>
            <Icon type="video-camera" />
        </Col>

          <ModalEdit visibled={true} />
        <Col span={9} onMouseOver={() => this.mouseOver()}  onMouseOut={() => this.mouseOut()}>
                     {name}
        </Col>
            {this.state.flipped ?
              <Col span={3} > <Icon  type="edit" /></Col>
                : null
            }
    </Row>
        <div style={{fontSize:'0.8em'}}><Icon type="camera-o" /><label>{dosage}</label></div>
    </div>
      )
    }
}



export default MedicationInfo

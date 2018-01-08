import React from 'react'
import ReactHover from 'react-hover'
import {Icon ,Modal,Button,Row, Col} from 'antd';
import {
    FormattedMessage,
} from 'react-intl';
import { Link } from 'react-router-dom'
import ModalEdit from '../../MedicationEdit/containers'
import Loadable from "../../../../../../../../../components/Loadable";

/*const AsyncModalEdit = () => {
    return (
        Loadable({
            loader: () => import('../../../../../../../../../routes/Plan/components/MedicationPlan/components/Medication/components/MedicationEdit/containers'),
        })
    );
}*/

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
        this.state = { visible: false };
    };
    static propTypes = {
    };
    handleCancel = () => {
        //console.log("handleCancel");
        this.setState({
            visible:false,
        });
    }
    mouseOut() {
        //console.log("Mouse out!!!");
        this.setState({flipped: false});
    }
    mouseOver() {
        //console.log("Mouse over!!!");
        this.setState({flipped: true});
    }
    iconClick() {
       // console.log("modalVisible");
       this.setState({visible: true});
    }
    render() {
        const {loading,account,user_id} = this.props;
        if(loading){
            return(<div>Loading</div>)
        }
   //     console.log(user_id);
        // const userId = 24038;
        const {id,drug} = this.props.info;
        //console.log(id);
        const {name, dosage} = drug;
        return (
<div>
    <Modal
        visible={this.state.visible}
        title={<FormattedMessage id="plan.medicationplan.medication.medicationedit.modal.title" defaultMessage="Edit Medication" description="Edit Medication" />}
        onCancel={this.handleCancel}
        footer={
                <Button key="submit" type="primary" >
                    <FormattedMessage id="plan.medicationplan.medication.medicationedit.modal.button" defaultMessage="Save Changes" description="Save Changes" />
                </Button>
        }
    >
        <ModalEdit id={id} userId={user_id} />
    </Modal>
    <Row>
        <Col span={2}>
            <Icon type="video-camera" />
        </Col>


        <Col span={9} onMouseOver={() => this.mouseOver()}  onMouseOut={() => this.mouseOut()}>
                     {name}
        </Col>
        <Col span={3}> <Icon  onClick={()=> this.iconClick()} type="edit" /></Col>
            {/*{this.state.flipped ?*/}

                {/*: null*/}
            {/*}*/}
    </Row>
        <div style={{fontSize:'0.8em'}}><Icon type="camera-o" /><label>{dosage}</label></div>
    </div>
      )
    }
}



export default MedicationInfo

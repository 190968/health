import React from 'react'
import {Icon ,Row, Col, Popconfirm} from 'antd';
import {
    FormattedMessage,
} from 'react-intl';

import MedicationEditForm from '../../MedicationEdit/containers'

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
    handleDelete = () => {
        const { deleteMed, info, user_id } = this.props;
        const {id} = info;
        return deleteMed(id, user_id);//, !this.state.isClicked, this.toggleCoin);
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
        const {loading,user_id, date} = this.props;
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


    {this.state.visible &&
    <MedicationEditForm id={id}
                        userId={user_id}
                        date={date}
                        title={<FormattedMessage id="plan.medicationplan.medication.medicationedit.modal" defaultMessage="Edit" description="Edit" />}
                        onCancel={this.handleCancel} />}


        <Row>
            <Col span={2} >
                <Icon type="video-camera" />
            </Col>


            <Col span={22} >
                         {name} <Icon onClick={()=> this.iconClick()} type="edit" /> <Popconfirm title="Are you sure you want to delete this medication?" onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Icon type="delete" /></Popconfirm>
            </Col>

        </Row>
        <Row style={{fontSize:'0.8em'}}>
            <Col span={2}>
                <Icon type="camera-o" />
            </Col>
            <Col span={22}>
                {dosage}
            </Col>
        </Row>
    </div>
      )
    }
}



export default MedicationInfo

import React from 'react'
import {Tooltip, Icon, Row, Col, Popconfirm, Popover} from 'antd';
import { MedicationCardFull } from '../../../../containers/MedicationCardFull';
import MedicationVideoButton from '../../../Medication/components/MedicationVideo/components/MedicationVideoButton';
// import MedicationChartPopup from '../../MedicationChartPopup';

const MedicationInfo = props => {
    const {showModal, toggleModal, i, ...otherProps} = props;
        const {date, medication, user} = otherProps;
        const {drug, image} = medication || {};

        const {name, dosage} = drug || {};

        // const content = <div>
        //     <Tooltip title="Details"><Icon type="info-circle-o" onClick={this.toggleDetails}/></Tooltip> <MedicationChartPopup
        //     item={this.props.info} user={user} userId={user.id} date={date} label="Weekly" /> <Tooltip title="Delete"><Popconfirm
        //     title="Are you sure you want to delete this medication?" onConfirm={this.handleDelete}
        //     okText="Yes" cancelText="No"><Icon type="delete"/></Popconfirm></Tooltip>
        // </div>;
      return <>
      {showModal && <MedicationCardFull {...otherProps} onHide={toggleModal} />}
      <Row onClick={toggleModal}>
                    <Col>
                    
                    <MedicationVideoButton drug={drug} /> {/*image && <Popover content={<div><img src={image} /></div>} title="Title" trigger="hover"><Icon type="camera-o"/></Popover>*/}  {name}
                    </Col>
                    <Col style={{fontSize: '0.8em'}}>
                        {dosage}
                    </Col>
                </Row>
                </>
}


export default MedicationInfo

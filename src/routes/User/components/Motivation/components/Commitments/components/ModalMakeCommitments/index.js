/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, DatePicker , Input, Divider,Card,Modal } from 'antd';
import ModalMakeCommitmentsFor from '../ModalMakeCommitmentsFor';
const {Option} = Select;
class ModalMakeCommitments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true,
            title:null
        };
    }
    handleCancel = () => {
        this.setState({ visible: true});

    }
    onChange = (e) => {
        console.log(e);
        this.setState({ title: e});
        this.setState({ visible: false});

    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return    <Modal>
                <Spin/>
            </Modal> ;
        }
        console.log(info);
        let selectItem =[];
        info.forEach(item=>{
            selectItem.push(  <Option key={item.id} value={item.title}>{item.title}</Option>)
        })

        return  (
            <div>
        {this.state.visible &&
            <Modal
                title="Make a Commitment"
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>Cancel</Button>
                ]}
            >

                <p>Select which Plan you would like to make a commitment to.</p><hr/>
                <center>
                    <Select defaultValue={info[0].title} style={{ width: 470 }} onChange={this.onChange}>
                        {selectItem}
                    </Select>
                </center>


            </Modal>}
                {!this.state.visible &&  <ModalMakeCommitmentsFor title={this.state.title} cancelParent={this.props.handleCancel} handleCancel={this.handleCancel} />}
                </div>
        );
    }
}
export default ModalMakeCommitments;
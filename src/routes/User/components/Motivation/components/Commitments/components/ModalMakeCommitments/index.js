/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, DatePicker , Input, Divider,Card,Modal } from 'antd';
import ModalMakeCommitmentsFor from '../../containers/ModalMakeCommitmentsFor';
import SelectPlans from '../../../../../../../Plan/containers/SelectPlans';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
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
        const {intl}=this.props;


        let selectItem =[];
        info.forEach(item=>{
            selectItem.push(  <Option key={item.id} value={item.title}>{item.title}</Option>)
        })

        return  (
            <div>
        {this.state.visible &&
            <Modal
                title={intl.formatMessage(messages.makeCommitment)}
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>{intl.formatMessage(messages.makeCommitment)}</Button>
                ]}
            >

                <p>{intl.formatMessage(messages.text)}</p><hr/>
                <center>
                    <SelectPlans onChange={this.onChange}/>
                </center>
            </Modal>}
                {!this.state.visible &&  <ModalMakeCommitmentsFor motivators={this.props.motivators} title={this.state.title} cancelParent={this.props.handleCancel} handleCancel={this.handleCancel} />}
                </div>
        );
    }
}
export default injectIntl(ModalMakeCommitments);
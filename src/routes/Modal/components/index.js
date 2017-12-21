
/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {
    FormattedMessage,

} from 'react-intl';


import {Modal, Form,Button} from 'antd';


class ModalForm extends React.Component {
    state = {
        visible: false,
    };

    handleCancel = () => {
        this.setState({ visible: false });
    }
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { onSubmit } = this.props;
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             this.setState({
    //                 loading: true
    //             });
    //             return onSubmit(values);
    //         }
    //     });
    // }
    //
    // handleClick = (e) => {
    //     e.preventDefault();
    //
    //     const { onClick } = this.props;
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             return onClick(values);
    //         }
    //     });
    // }



    render() {

        const { visible, loading } = this.state;
        return (
            <Modal
                visible={true}
                title={<FormattedMessage id="default" defaultMessage="Inactivity" description="Inactivity" />}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleClick}>
                        <FormattedMessage id="user.login.forgot.send" defaultMessage="Send" description="Send" />
                    </Button>,
                ]}
            >
                <FormattedMessage id="default2" defaultMessage="You were inactive for 5 minutes" description="You were inactive for 5 minutes" />
            </Modal>

        );
    }
}

const WrappedModalForm = Form.create()(ModalForm);
export default WrappedModalForm;
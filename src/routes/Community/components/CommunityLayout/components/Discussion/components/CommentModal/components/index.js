/**
 * Created by Павел on 31.01.2018.
 */
import React, { PropTypes } from 'react';
import { Form,Card,Icon,Modal,Input} from 'antd';
import {withRouter} from "react-router-dom";
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;

class CommentModal extends React.Component{
    state = { visible: true ,title:""}
    constructor(props) {
        super(props);
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleModalSubmit = () => {
        const { discussionReply } = this.props;
        this.props.form.validateFields((err, values) => {
            if(err!=null)
            {console.log(err);

                return null;
            }
            discussionReply(values.textReply,this.props.params,this.props.match.params.id).then(({data}) => {
                this.setState({
                    visible: false
                });
            });
        });
    }

    render(){

        const {intl}=this.props;
        const {getFieldDecorator} = this.props.form;

        return(
                <Modal
                    title={intl.formatMessage(messages.reply)}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    okText={intl.formatMessage(messages.send)}
                    onOk={this.handleModalSubmit}
                >
                    <Form onSubmit={this.handleModalSubmit} >
                        <FormItem>
                            {getFieldDecorator('textReply',{
                                    initialValue: this.state.title,
                                    rules: [{ required: true, message:"Input text Please" , whitespace: true }],
                                }
                            )(

                                <Input
                                    suffix={<Icon type="paper-clip" />}
                                />

                            )}
                        </FormItem>
                    </Form>

                </Modal>
        );
    }

}
const WrappedCommentModal = Form.create()(CommentModal);
export default withRouter(injectIntl(WrappedCommentModal));


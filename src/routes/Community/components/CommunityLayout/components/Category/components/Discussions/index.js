/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Icon,Form,Input,Button,Modal,Card,List,Row,Avatar } from 'antd';
import moment from 'moment';
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
import { Link } from 'react-router-dom'
import DiscussionModal from '../DiscussionModal/components'
import DiscussionListItem from '../DiscussionListItem'
import {
    injectIntl
} from 'react-intl';
import messages from './communityDiscussion.json';
import {Empty, Loading} from "../../../../../../../../components/Loading";

const FormItem = Form.Item;
const { TextArea } = Input;
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};




class Discussions extends React.Component{
    state = {discussionModal: false }
    constructor(props){
        super(props);
    }

    showModal = () => {
        this.setState({
            discussionModal: true
        });
    }
    handleCancel = (e) => {
        this.setState({
            discussionModal: false,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values);
        });
    }
    render(){

        const {loading} = this.props;
        if (loading) {
            return (
                <Loading/>
            );
        }
        const { intl } = this.props;
        const {name,discussions, canAdd} = this.props;


        return(



            <Card
                title={name.toUpperCase()+intl.formatMessage(messages.communityDiscussion)}
                extra={canAdd && <Button type="primary" size="small" onClick={this.showModal}>{intl.formatMessage(messages.start)}</Button>}
            >

                <Row>
                    {discussions.length > 0 ? <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={discussions}
                        renderItem={item => (
                           <DiscussionListItem item={item}/>

                        )}
                    /> : <Empty text='No Discussions' />}
                </Row>
                { this.state.discussionModal && <DiscussionModal onSubmit={this.props.onSubmit} onCancel={this.handleCancel} />}
            </Card>
        );
    }

}

export default withApollo(withRouter(injectIntl(Discussions)));

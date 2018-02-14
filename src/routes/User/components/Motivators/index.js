/**
 * Created by Pavel on 08.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './messages';
import { Form,  List,Avatar,Select, Card,Modal,Input, Button, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
class Motivators extends React.Component {
    state = { visible: false }
    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values, this.handleCancel);
        });

    }

    render() {

        const  {info,loading} = this.props;

        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="My Motivators" description="MY MOTIVATORS" />}>
                                 Loading</Card>;
        }
        const  {motivators} = info;
        const  {edges,totalCount} = motivators;
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        return(


        <Card title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="My Motivators" description="MY MOTIVATORS" />}

        >
            {edges.length > 0 ? <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
                    dataSource={edges}
                    renderItem={person => (

                        <List.Item key={person.id}>
                            {
                                person.user.firstName ?
                                    <Link to={'/u/'+person.id} style={{color: 'inherit'}}>
                                        <Avatar /*size="large"*/ style={{ verticalAlign: 'middle', backgroundColor: person.user.color }}>{person.user.firstName[0]}</Avatar>
                                        <span style={{textAlign:'center','marginLeft':10}}>{person.user.firstName}</span>
                                    </Link> :
                                    <div>
                                        <span><Avatar  style={{ verticalAlign: 'middle' }}>N</Avatar> </span>
                                        <label>No name</label>
                                    </div>
                            }

                        </List.Item>
                    )}
            /> : <div className="ant-list-empty-text">No Motivators</div>}
            <Modal
                title="Invite motivators"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                okText="Submit"
                onOk={this.handleSubmit}
            >
                <Form onSubmit={this.handleSubmit} >
                    <FormItem
                        {...formItemLayout}
                        label="Email"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message:intl.formatMessage(messages.email_rule_type),
                            }, {
                                required: true,  message: intl.formatMessage(messages.email_rule_required),
                            }],
                        })(
                            <Input
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Text message"
                    >
                        {getFieldDecorator('text')(
                            <TextArea autosize />
                        )}
                    </FormItem>
                </Form>

            </Modal>
            </Card>
        )
    }
}

const WrappedMotivators= Form.create()(Motivators);
export default withRouter(injectIntl(WrappedMotivators));
/**
 * Created by Pavel on 21.12.2017.
 */
import React, { PropTypes } from 'react';
import {
    FormattedMessage,
} from 'react-intl';
import { Link } from 'react-router-dom'
import moment from 'moment';
import {Modal, Form ,List,Radio,Row, Col,Select,Input, DatePicker , Button } from 'antd';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;


class EditTrackerForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="Critical Range"
                >
                    {getFieldDecorator('criticalRange', {

                    })(
                        <Col span={6}>
                            <Col span={10}> below </Col><Col span={14}><Input /></Col>
                        </Col>

                    )}
                </FormItem>
            </Form>

        );
    }
}

const WrappedEditTrackerForm = Form.create()(EditTrackerForm);
export default WrappedEditTrackerForm;

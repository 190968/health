/**
 * Created by Pavel on 04.12.2017.
 */
import React,{PropTypes} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
class NormalLogoutForm extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return onSubmit(values);
            }
        });
    }


    render(){
return(
    // <Form onSubmit={this.handleSubmit}>
    //     <Button type="primary" htmlType="submit" className="login-form-button">Logout</Button>
    //     </Form>
    <div>pasha</div>
)

    }
}
const WrappedNormalLogoutForm = Form.create()(NormalLogoutForm);
export default WrappedNormalLogoutForm;
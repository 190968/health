/**
 * Created by Pavel on 04.12.2017.
 */
import React,{PropTypes} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
class NormalLogoutForm extends React.Component{

    render(){
        return(
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="login-form-button">Logout</Button>
            //     </Form>
            <div>Logged Out</div>
        )

    }
}
export default NormalLogoutForm;
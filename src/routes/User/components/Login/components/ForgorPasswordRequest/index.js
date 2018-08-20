import React from 'react';
import {Form, Input, Button} from 'antd';
const FormItem = Form.Item;

const ForgotPasswordRequest = props => {

    const {email, loadingButton=false, form} = props;

    const { getFieldDecorator } = form;
    return (
           
                <Form onSubmit={props.onSubmit}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            initialValue:email,
                            rules: [{ required: true, message: 'Please enter Email'/*, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/*/ }],
                        })(
                            <Input placeholder={'Email'} />
                        )}

                    </FormItem>

                    <center>
                    
                    <Button type={'primary'} loading={props.loadingButton} onClick={props.onSubmit} >Reset</Button>
                    </center>
                </Form>
    );
}

export default ForgotPasswordRequest;
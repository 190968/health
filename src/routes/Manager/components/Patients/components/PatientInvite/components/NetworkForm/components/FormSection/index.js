import React from 'react';
import FormField from '../FormField';
import {Form, Button} from 'antd';


const FormSection = props => {
    const { section, ...otherProps } = props;
    const { fields = [] } = section;

    return <React.Fragment>
        <Form>
            {fields.map((field, i) => {
                return <FormField field={field} key={i} {...otherProps} />;
            })}
        </Form>
        <div style={{textAlign:'right'}}>
            <Button  type={'primary'} onClick={props.onSubmit}>Next</Button>
        </div>
    </React.Fragment>;
}

export default FormSection;
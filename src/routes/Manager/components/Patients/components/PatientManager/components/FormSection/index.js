import React from 'react';
import FormField from '../FormField';
import {Form, Button} from 'antd';
import { DrawerFooter } from '../../../../../../../../components/Modal';


const FormSection = props => {
    const { section, isLastSection=false, ...otherProps } = props;
    const { fields = [] } = section;
    
    return <React.Fragment>
        <Form>
            {fields.map((field, i) => {
                return <FormField field={field} key={i} {...otherProps} />;
            })}
        </Form>
        <div style={{textAlign:'right'}}>
            <Button  type={'primary'} onClick={props.onSubmit}>{isLastSection ? 'Finish' : 'Next'}</Button>
        </div>
    </React.Fragment>;
}

export default FormSection;
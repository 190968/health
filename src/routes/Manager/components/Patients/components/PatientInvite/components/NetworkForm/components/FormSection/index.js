import React from 'react';
import FormField from '../FormField';

const FormSection = props => {
    const { section, ...otherProps } = props;
    const { fields = [] } = section;

    return  fields.map((field, i) => {
        return <FormField field={field} key={i} {...otherProps} />;
    });
}

export default FormSection;
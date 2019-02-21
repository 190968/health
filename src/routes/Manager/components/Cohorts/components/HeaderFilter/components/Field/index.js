import React from 'react';
import {Form, Col, Input, Icon} from 'antd';
// import { defaultProps } from 'recompose';
import { FilterField } from '../../../../../../../../components/Tables/FilterFields';

const CohortHeaderFilterField = props => {
    const {i, form, field, activeFilters={}} = props;
    const { getFieldDecorator } = form;
    const count = props.isToggled ? 10 : 3;
    
    const value = activeFilters[field.key] || null;

    return <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
    <Form.Item label={field.label}>
      {getFieldDecorator(`field-${i}`, {
            initialValue:value,
            // rules: [{
            // required: true,
            // message: 'Input something!',
            // }],
      })(
          <FilterField field={field} onChange={props.onChange} />
      )}
    </Form.Item>
  </Col>
};

export default CohortHeaderFilterField;
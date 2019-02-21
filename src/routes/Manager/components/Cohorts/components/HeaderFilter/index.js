import React from 'react';
import {Row, Col, Button, Icon, Form} from 'antd';
import {CohortHeaderFilterField} from './containers/Field';
import './index.less';
import CohortManagerButton from '../Buttons/components/Manage';
import { cohortPatientFilters } from '../../../../../../components/Tables/FilterFields';


const CohortHeaderFilter = props => {
   const {activeFilters} = props;
    return <Form
    layout="inline"
    className="ant-advanced-search-form"
    // onSubmit={this.handleSearch}
  >
        <Row gutter={24}>
        {cohortPatientFilters.map((field, i) => <CohortHeaderFilterField key={i} {...props} field={field} i={i} />)}</Row>
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={props.toggleState}>
                Advanced <Icon type={props.isToggled ? 'up' : 'down'} />
                </a> {/*<Button style={{ marginLeft: 8 }} onClick={props.onReset}>
                Clear
</Button>*/} <CohortManagerButton activeFilters={activeFilters} button label={'Create Population'} htmlType="submit" />
                
            </Col>
        </Row>
    </Form>
};

export default CohortHeaderFilter;
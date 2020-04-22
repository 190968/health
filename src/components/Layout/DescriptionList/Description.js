import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Col } from 'antd';
import './index.less';
const FormItem = Form.Item;
const responsive  = {
    1: { xs: 24 },
    2: { xs: 24, sm: 12 },
    3: { xs: 24, sm: 12, md: 8 },
    4: { xs: 24, sm: 12, md: 6 },
}

const Description = ({ term, column, className, children, highlight, excludeEmpty=false, formItemLayout, ...restProps }) => {
    const clsString = classNames('description', className/*, {highlight}*/);
    if (excludeEmpty) {
        if (children === null || children === undefined || children === '') {
            return null;
        }
    }
    if (highlight) {

    }
    if (formItemLayout) {
        return <FormItem
            {...formItemLayout}
            label={term}
        >
        <span className="ant-form-text">{children}</span>
        </FormItem>
    }
    return (
        <Col className={clsString} {...responsive[column]} {...restProps}>
            {term && <div className={'term'}>rtte{term}</div>}
            {children !== null && children !== undefined &&
            <div className={'detail'}>{children}</div>}
        </Col>
    );
};

Description.defaultProps = {
    term: '',
};

Description.propTypes = {
    term: PropTypes.node,
};

export default Description;
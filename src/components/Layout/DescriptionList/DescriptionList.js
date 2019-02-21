import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import  './index.less';
import Description from './Description';

const DescriptionList = (props) => {

    const {
        className,
        title,
        col = 3,
        row,
        layout = 'horizontal',
        aligh='left',
        gutter = 32,
        size,
        details,
        formItemLayout,
        ...restProps
    } = props;
    let {children} = props;

    const clsString = classNames('descriptionList', 'small', layout, className, 'align-'+aligh);
    const column = col > 4 ? 4 : col;

    if (details) {
        console.log(details);
        children = details.map((detail, i) => {
            if (detail.length === 1) {
                return detail[0];
            }
            return <Description term={detail[0]} key={i} highlight={(details && details[2]) || false} formItemLayout={formItemLayout} excludeEmpty>{detail[1]}</Description>;
        });
    }

    const content = React.Children.map(children, child => child ? React.cloneElement(child, { column }) : child);
    return (
        
        <div className={clsString} {...restProps}>
            {title ? <div className={'title'}>{title}</div> : null}
            <Row gutter={gutter}>
                {content}
            </Row>
        </div>
    );
};

export default DescriptionList;
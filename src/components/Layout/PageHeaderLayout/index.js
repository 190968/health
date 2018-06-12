import React from 'react';
import './index.less';
import {PageHeader} from "../PageHeader/index";

export const PageHeaderLayout = ({ children, wrapperClassName, top, ...restProps }) => (
    <div  className={wrapperClassName}>
        {top}
        <PageHeader key="pageheader" {...restProps} />
        {children ? <div className="pageContent">{children}</div> : null}
    </div>
);
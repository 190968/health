import React from 'react';
import './index.less';
export const CardFooter = props => {
    const {children} = props;
    if (children) {
        return <div className={'cardFooter'}>{children}</div>
    } else {
        return null;
    }
}
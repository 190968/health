import React from 'react';
import './index.less';

export const SideToSide = props => {
    const {children} = props;
    return <div className={'flexbox-wrap'}>
    {children.map((c, i) => {
        return <div key={i} className={'flexbox-item fi-' + i}>{c}</div>
    })}
    </div>;
}
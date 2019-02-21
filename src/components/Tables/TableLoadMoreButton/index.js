import React from 'react';
import './index.less';

export const TableLoadModeButton = props => {
    return <div className={'tableMoreButton'} onClick={props.onClick}>Load More</div>;
}
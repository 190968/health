import React from 'react';
import {Icon, Tooltip} from 'antd';
import { GlobalSearchDrawer } from './containers/GlobalSearchDrawer';

const GlobalSearch = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <GlobalSearchDrawer {...otherProps} asModal onHide={toggleModal} />}
        <Tooltip title={'Search'}><Icon type="search" theme="outlined" onClick={toggleModal} className={'pointer'} /></Tooltip>
    </React.Fragment>
    return 
}

export default GlobalSearch;
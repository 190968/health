import React from 'react';
import {Button, Icon, Tooltip} from 'antd';
import { SendMessage } from './containers/SendMessage';

const SendMessageButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    const {user, iconOnly=false, icon=false, label} = otherProps;
    return <React.Fragment>
        {showModal && <SendMessage {...otherProps} asModal onHide={toggleModal} />}
        {iconOnly ? <Tooltip title={label || 'Send Message'}><Icon type={'mail'} onClick={toggleModal} /></Tooltip> : icon ? <Button type={'primary'} icon={'mail'} onClick={toggleModal} /> : <Button type={'primary'} icon={'mail'} onClick={toggleModal} >{label || 'Send Message'}</Button> }
    </React.Fragment>
}

export default SendMessageButton;
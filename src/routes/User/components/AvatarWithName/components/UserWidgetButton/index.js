import React from 'react';
import {Icon, Drawer} from 'antd';
import Avatar from '../../../Avatar'
import UserWidget from '../../containers/UserWidget';
const UserWidgetButton = props => {
    const {showModal, toggleModal, user, displayName,  ...otherProps} = props;
    const {size, onlyName=false} = otherProps;
    
    // let avatarWithName = <span><span style={{marginRight:5}}><Avatar info={user} size={size}/></span><span className={'link-text'} style={{verticalAlign: 'middle'}}>{displayName}</span></span>;
    // if (onlyName) {
    //     avatarWithName = name;
    // }
    return <React.Fragment>
        {showModal && <UserWidget user={user} {...otherProps} onHide={toggleModal} />}
        <span onClick={toggleModal} className={'userlink link drawer with-icon'}>{displayName}</span>
    </React.Fragment>
}

export default UserWidgetButton;
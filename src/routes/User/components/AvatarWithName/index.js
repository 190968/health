/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Row, Col} from 'antd';
import Truncate from 'react-truncate';
// import Avatar from '../Avatar'
import {Link} from 'react-router-dom';
import UserWidgetButton from './containers/UserWidgetButton';
import Avatar from '../Avatar';
import './index.less';
import { SendMessageButton } from '../../../../components/User/containers/SendMessageButton';

export const UserName = props => {
    const {user} = props;
    const {firstName, lastName, fullName} = user || {};
    return fullName;
}
export const AvatarWithName = props => {

        const {user, ...otherProps} = props;

        if (!user) {
            return null;
        }
        let {mode, showEmail=false, truncate=false, showMail=false, isSelf=false, size, onlyName=false, onlyAvatar=false, useLink=true, widget=true} = otherProps || {};
        const {id, firstName, fullName,email} = user;

        if (isSelf) {
            useLink = false;
        }
        switch(mode) {
            case 'simple':
                showMail = !isSelf;
                widget = false;
                onlyName = true;
                break;
        }
        if (!id || id === '') {
            useLink = false;
        }
        let displayName = onlyName ? firstName : fullName;

        if (!id || id === '') {
            if (email) {
                displayName = email;
            } else {
                displayName = 'N/A';
            }
            useLink = false;
        }
        let avatarWithName = <span><Avatar user={user} size={size}/> <span className={'username'} >{truncate ? <Truncate lines={1}>{displayName}</Truncate> : displayName}</span></span>;
        if (showEmail) {
            avatarWithName = <span className={showEmail && 'with-email'}><Avatar user={user} size={size}/> <span className={'username'} >{truncate ? <Truncate lines={1}>{displayName}</Truncate> : displayName} {email && <div style={{color: '#ccc'}}>{email}</div>}</span></span>;
        
        }
        if (onlyName) {
            avatarWithName = displayName;
        } else if (onlyAvatar) {
            avatarWithName = <Avatar user={user} size={size}/>;
        }
        if (widget && useLink) {
            return <UserWidgetButton user={user} displayName={avatarWithName} {...otherProps} />
        }
        

        
        if (useLink) {

            

       

        
            avatarWithName = <Link to={'/u/' + id} style={{color: 'inherit'}}>{avatarWithName}</Link>;
        }
        return (
                <span className={'userlink clearfix'}>{
                    // align === "v" ?
                    //     info.firstName ?
                    //         <Row>
                    //             <Avatar user={info}/>
                    //             <p>{info.firstName}</p>
                    //         </Row> :
                    //         info.email ?
                    //             <Row>
                    //                 <Avatar user={info}/>
                    //                 <Truncate lines={2}><p>{info.email}</p></Truncate>
                    //             </Row> :
                    //             <center>
                    //                 <Avatar user={info}/>
                    //                 <p>No name</p>
                    //             </center>
                    //     :
                        avatarWithName
                } {showMail && <SendMessageButton user={user} iconOnly />}
                </span>
        );
}

export default AvatarWithName;
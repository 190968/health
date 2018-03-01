/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar as AvatarAntd} from 'antd';
import './index.less';

class Avatar extends React.PureComponent {

    static defaultProps = {
        size: 'small',
        src: '',
        info: {},
    }
    render() {

        const {src,info, size} = this.props;

        // if we need a realy big avatar(profile page)
        const extraClass = size === 'huge' ? 'ant-avatar-huge' : '';

        if (src !== '') {
            return <AvatarAntd src={src} className={extraClass} size={size} style={{verticalAlign: 'middle'}} />
        }

        const {thumbs={}} = info;
        const {small=''} = thumbs;
        return (
                <AvatarAntd src={small} className={extraClass} size={size} style={{verticalAlign: 'middle', backgroundColor: info.color}}>
                    {info.firstName && info.fullName ? info.firstName[0] :
                        (info.email ? info.email[0] : 'N/A' )}
                </AvatarAntd>

        );
    }
}

export default Avatar;
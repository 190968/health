/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar as AvatarAntd} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';

class Avatar extends React.PureComponent {

    static defaultProps = {
        size: 'small',
        src: '',
        useLink: false,
        info: {},
    }
    render() {

        const {src, info, size, useLink} = this.props;

        // if we need a realy big avatar(profile page)
        const extraClass = size === 'huge' ? 'ant-avatar-huge' : '';

        if (src !== '') {
            return <AvatarAntd src={src} className={extraClass} size={size} style={{verticalAlign: 'middle'}} />
        }

        const {thumbs={}} = info;
        const {small=''} = thumbs;
        const name = info.firstName ? info.firstName : ((info.fullName && info.fullName !== ' ') ? info.fullName : '');
        //console.log(name);
        let avatar =
                <AvatarAntd src={small} className={extraClass} size={size} style={{verticalAlign: 'middle', backgroundColor: info.color}}>
                    {name ? name[0] :
                        (info.email ? info.email[0] : 'N/A' )}
                </AvatarAntd>;

        if (useLink) {
            avatar = <Link to={'/u/'+info.id}>{avatar}</Link>;
        }
        return (avatar);
    }
}

export default Avatar;
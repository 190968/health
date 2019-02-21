/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar as AvatarAntd, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';

export class Avatar extends React.PureComponent {

    static defaultProps = {
        size: 'small',
        src: '',
        useLink: false,
       //info: {},
    }
    render() {
        const {user={}} = this.props;
        const {src, info=user, useLink, tooltip=true} = this.props;
        let {size} = this.props;

        // if we need a realy big avatar(profile page)
        let extraClass = '';
        
        switch(size) {
            default:
            extraClass += 'ant-avatar-'+size;
            break;
        }

        if (src !== '') {
            return <AvatarAntd src={src} className={extraClass} size={size} style={{verticalAlign: 'middle'}} />
        }


        const {id, email, thumbs={}, firstName, fullName, color} = info || {};
        const {small='', large='', medium=''} = thumbs || {};
        const name = firstName ? firstName : ((fullName && fullName !== ' ') ? fullName : '');
        //console.log(name);
        let url = '';

        switch (size) {
            case 'huge':
            url = large;
            size = 100;
            break;
            case 'large':
                url = large;
                break;
            default:
                url = medium;
                break;
        }
        let avatar =
                <AvatarAntd src={url} className={extraClass} size={size} style={{verticalAlign: 'middle', border:'1px solid '+color, textTransform: 'uppercase', backgroundColor: color}}>
                    {name ? name[0] :
                        (email ? email[0] : 'N/A' )}
                </AvatarAntd>;

                if (tooltip) {
                    avatar = <Tooltip title={name}>{avatar}</Tooltip>;
                }
        if (useLink) {
            avatar = <Link to={'/u/'+id}>{avatar}</Link>;
        }
        return (avatar);
    }
}

export default Avatar;
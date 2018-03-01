/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar as AvatarAntd} from 'antd';

class Avatar extends React.PureComponent {

    render() {

        const {info} = this.props;
        const {thumbs} = info;
        console.log(thumbs);
        return (
                <AvatarAntd size="small" style={{verticalAlign: 'middle', backgroundColor: info.color}}>
                    {info.firstName && info.fullName ? info.firstName[0] :
                        (info.email ? info.email[0] : 'N/A' )}
                </AvatarAntd>

        );
    }
}

export default Avatar;
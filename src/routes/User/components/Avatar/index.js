/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar as AvatarAntd} from 'antd';

class Avatar extends React.Component {

    render() {

        const {info} = this.props;
        return (
            <center>
                <AvatarAntd size="small" style={{verticalAlign: 'middle', backgroundColor: info.color}}>
                    {info.firstName && info.fullName ? info.firstName[0] :
                        (info.email ? info.email[0] : 'N/A' )}
                </AvatarAntd>
            </center>

        );
    }
}

export default Avatar;
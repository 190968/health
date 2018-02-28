/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar } from 'antd';

class AvatarX extends React.Component {

    render() {

        const {info} = this.props;
        return (

            info.firstName&&info.fullName ?
                <center>
                    <Avatar size="small" style={{ verticalAlign: 'middle', backgroundColor: info.color }}>{info.firstName[0]}</Avatar>
                </center>
                 :
                info.email ?
              <center>
                    <Avatar size="small" style={{ verticalAlign: 'middle' }}>N/A</Avatar>
              </center>:
                    <center>
                        <Avatar size="small" style={{ verticalAlign: 'middle' }}>N/A</Avatar>
                    </center>
        );
    }
}
export default AvatarX;
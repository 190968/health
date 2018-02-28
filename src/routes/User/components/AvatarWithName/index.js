/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar } from 'antd';
import Truncate from 'react-truncate';
class AvatarWithName extends React.Component {

    render() {

        const {info} = this.props;
        return (

            info.firstName&&info.fullName ?
                <center>
                    <Avatar size="small" style={{ verticalAlign: 'middle', backgroundColor: info.color }}>{info.firstName[0]}</Avatar>
                    <p>{info.fullName}</p>
                </center>:
                info.email ?
                    <center>
                        <Avatar size="small" style={{ verticalAlign: 'middle' }}>N/A</Avatar>
                        <Truncate lines={1}><p>{info.email}</p></Truncate>


                    </center>:
                    <center>
                        <Avatar size="small" style={{ verticalAlign: 'middle' }}>N/A</Avatar>
                        <p>No name</p>
                    </center>
        );
    }
}
export default AvatarWithName;
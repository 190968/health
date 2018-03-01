/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Avatar,Row,Col} from 'antd';
import Truncate from 'react-truncate';
class AvatarWithName extends React.Component {

    render() {

        const {info,align=[]} = this.props;

        return (
<div>
    {
        align === "v" ?
             info.firstName ?
                <Row>
                    <Avatar size="small"
                            style={{verticalAlign: 'middle', backgroundColor: info.color}}>{info.firstName[0]}</Avatar>
                    <p>{info.firstName}</p>
                </Row> :
                info.email ?
                    <Row>
                        <Avatar size="small" style={{verticalAlign: 'middle'}}>N/A</Avatar>
                        <Truncate lines={2}><p>{info.email}</p></Truncate>
                    </Row> :
                    <Row>
                        <Avatar size="small" style={{verticalAlign: 'middle'}}>N/A</Avatar>
                        <p>No name</p>
                    </Row>

            :

            info.firstName ?
                <Row>
                    <Col span={11}>
                        <Avatar size="small" style={{verticalAlign: 'middle', backgroundColor: info.color}}>{info.firstName[0]}</Avatar>
                    </Col>
                    <Col  span={12}>
                        <p>{info.firstName}</p>
                    </Col>
                </Row> :
                info.email ?
                    <Row>
                        <Col span={11}>
                            <Avatar size="small" style={{verticalAlign: 'middle'}}>N/A</Avatar>
                            </Col>
                        <Col  span={12}>
                        <Truncate lines={2}><p>{info.email}</p></Truncate>
                            </Col>
                    </Row> :
                    <Row>
                        <Col span={11}>
                        <Avatar size="small" style={{verticalAlign: 'middle'}}>N/A</Avatar>
                            </Col>
                        <Col  span={12}>
                        <p>No name</p>
                            </Col>
                    </Row>
    }
    {/*{  info.firstName ?*/}
        {/*<center>*/}
            {/*<Avatar size="small"*/}
                    {/*style={{verticalAlign: 'middle', backgroundColor: info.color}}>{info.firstName[0]}</Avatar>*/}
            {/*<p>{info.firstName}</p>*/}
        {/*</center> :*/}
        {/*info.email ?*/}
            {/*<center>*/}
                {/*<Avatar size="small" style={{verticalAlign: 'middle'}}>N/A</Avatar>*/}
                {/*<Truncate lines={2}><p>{info.email}</p></Truncate>*/}
            {/*</center> :*/}
            {/*<center>*/}
                {/*<Avatar size="small" style={{verticalAlign: 'middle'}}>N/A</Avatar>*/}
                {/*<p>No name</p>*/}
            {/*</center>*/}
    {/*}*/}
    </div>
        );
    }
}
export default AvatarWithName;
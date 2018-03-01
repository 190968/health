/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import {Row,Col} from 'antd';
import Avatar from '../Avatar'
import Truncate from 'react-truncate';
class AvatarWithName extends React.PureComponent {

    static defaultProps = {
        align:'h'
    }
    render() {

        const {info, align} = this.props;


        return (
<div>
    {
        align === "v" ?
             info.firstName ?
                <Row>
                    <Avatar info={info} />
                    <p>{info.firstName}</p>
                </Row> :
                info.email ?
                    <Row>
                        <Avatar info={info} />
                        <Truncate lines={2}><p>{info.email}</p></Truncate>
                    </Row> :
                    <center>
                        <Avatar info={info} />
                        <p>No name</p>
                    </center>

            :

            info.firstName ?

                <span><Avatar info={info}/> <span style={{verticalAlign: 'middle'}}>{info.firstName}</span></span>
                 :
                info.email ?
                    <Row>
                        <Col span={5}>
                            <Avatar info={info} />
                            </Col>
                        <Col  span={19}>
                        <Truncate lines={2}><p>{info.email}</p></Truncate>
                            </Col>
                    </Row> :
                    <Row>
                        <Col span={5}>
                            <Avatar info={info} />
                            </Col>
                        <Col  span={19}>
                        <p>No name</p>
                            </Col>
                    </Row>
    }
    </div>
        );
    }
}
export default AvatarWithName;
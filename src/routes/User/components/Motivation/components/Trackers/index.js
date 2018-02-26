/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Progress , Card } from 'antd';

class Trackers extends React.Component {


    render() {
        const{level} = this.props.trackers;
        return  (
            <Card title="Trackers">
                <center>
                    <Progress type="dashboard" percent={level} />
                </center>
            </Card>

        );
    }
}
export default Trackers;
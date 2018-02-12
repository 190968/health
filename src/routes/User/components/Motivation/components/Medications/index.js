/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Progress , Card } from 'antd';

class Medications extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const{level} = this.props.medications;
        return  (
            <Card title="Medications">
                <center>
                    <Progress type="dashboard" percent={level} />
                </center>
            </Card>

        );
    }
}
export default Medications;
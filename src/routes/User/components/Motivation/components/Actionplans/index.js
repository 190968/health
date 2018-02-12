/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Progress , Card } from 'antd';

class Actionplans extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const{level} = this.props.plans;
        return  (
            <Card title="Actionplans">
                <center>
                    <Progress type="dashboard" percent={level} />
                </center>
            </Card>

        );
    }
}
export default Actionplans;
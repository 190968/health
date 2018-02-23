/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Progress , Card } from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
class Actionplans extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const{level} = this.props.plans;
        const {intl}=this.props;
        return  (
            <Card style={{height:250}} title={intl.formatMessage(messages.actionPlans)}>
                <center>
                    <Progress type="dashboard" percent={level} />
                </center>
            </Card>

        );
    }
}
export default injectIntl(Actionplans);
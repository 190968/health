/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Progress , Card } from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
class Medications extends React.Component {

    render() {
        const{level} = this.props.medications;
        const {intl}=this.props;
        return  (
            <Card style={{height:250}} title={intl.formatMessage(messages.medications)}>
                <center>
                    <Progress type="dashboard" percent={level} />
                </center>
            </Card>

        );
    }
}
export default injectIntl(Medications);
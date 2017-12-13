import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { DatePicker } from 'antd';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';


export class DashUserLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }
    static propTypes = {
        user_id: PropTypes.number,
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render () {
        const {
            plans, loading,logout,loadMoreEntries
        } = this.props;
        if (1==5 && loading) {
            //return (<div>Loading...</div>);
            return (
                <div className='box'>
                    <div className="box__header"><h3>ActionPlans</h3></div>
                    <div className="box__body">
                      Loading
                    </div>
                </div>
            );
        }
        //onsole.log("Logkout");
        return (
           <div>
               <FormattedMessage id="dashUser.hello_world" defaultMessage="Hello World2!" description="Hello world header greeting2" />
               <FormattedNumber value={1000} /> {' '}
               <FormattedPlural value={1000}
                                one="message"
                                other="messages"
               />.
               <DatePicker />
           </div>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

export default DashUserLayout;



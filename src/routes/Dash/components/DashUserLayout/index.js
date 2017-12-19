import React from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import MedicationPlan from 'routes/Plan/components/MedicationPlan/containers';
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
            plans, loading, medicationPlan
        } = this.props;
        if (loading) {
            //return (<div>Loading...</div>);
            return (
                <center>
                    <div  className='my-awesome-placeholder'>
                        <ReactPlaceholder type='text'  rows={6} color='#E0E0E0'>
                        </ReactPlaceholder>
                    </div>
                </center>
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



               <MedicationPlan info={medicationPlan} />
           </div>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

export default DashUserLayout;



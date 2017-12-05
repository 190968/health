import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'antd';


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
            plans, loading,loadMoreEntries
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

        return (
           <div>Logout button here</div>);
    }
}

export default DashUserLayout;



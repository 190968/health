import React from 'react';
import {Button, Calendar, Card} from 'antd';

import AddCalendarEvent from './AddCalendarEvent';


class CalendarLayout extends React.Component {
    state = {
        showAdd:false
    }

    toggleAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }

    render() {

        return (<Card extra={<Button onClick={this.toggleAdd}>Add</Button>}>
            {this.state.showAdd && <AddCalendarEvent onHide={this.toggleAdd}/>}
            <Calendar />
        </Card>)
    }
}

export default CalendarLayout

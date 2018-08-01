import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, Button, Calendar, Card} from 'antd';

import AddCalendarEvent from '../../containers/AddCalendarEvent';


class CalendarWidget extends React.Component {
    state = {
        showAdd:false
    }

    toggleAdd = () => {
        this.setState({showAdd: !this.state.showAdd})
    }

    render() {

        return (
        <Card title="Health Calendar"
              extra={<Button.Group><Button size={"small"} ><Link to='/calendar'><Icon type="calendar" /></Link></Button><Button size={"small"}  onClick={this.toggleAdd}><Icon type="plus" /></Button></Button.Group>}
        >
            {this.state.showAdd && <AddCalendarEvent onHide={this.toggleAdd}/>}
            <Calendar fullscreen={false} />
        </Card>)
    }
}

export default CalendarWidget

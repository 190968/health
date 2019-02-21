import React from 'react';
import {Button, Calendar, Card, Menu, Dropdown} from 'antd';
import CalendarTypesSelector from './containers/CalendarTypesSelector';
import { CalendarAppointmentButton } from './containers/CalendarAppointmentButton';
import {CalendarEventClickable} from './containers/CalendarEventClickable';
import {compose,withHandlers, withState} from 'recompose';
import { AddCalendarEvent } from '../../containers/AddCalendarEvent';
import './index.less';

const CalendarLayoutPure = (props) => {
    const {showAdd, user, toggleAdd, events=[], selectedDate, handleChangeType} = props;
    return (<React.Fragment>
        {selectedDate && <AddCalendarEvent date={selectedDate} onHide={props.resetSelectedDate} />}
        <Card title={'Calendar'} extra={<CalendarAppointmentButton user={user} />}>
        <CalendarTypesSelector label={'Event Type:'} defaultSelectAll onChange={handleChangeType} />
    </Card>

    <Card>
       <Calendar
        dateCellRender={props.dateCellRender}
        onSelect={props.onSelectDate}
       />
   </Card>
    
    </React.Fragment>)
}
const enhance = compose(
    withState('selectedDate', 'setSelectedDate'),
    withHandlers({
        resetSelectedDate: props => value => {
            props.setSelectedDate(null);
        },
        onSelectDate: props => value => {
            props.setSelectedDate(value);
        },
        dateCellRender: props => value => {
            const {events=[]} = props;
            console.log(value);
            const items = events.filter(event => value.isSame(new Date(event.dateTime), "day"));
            //const listData = getListData(value);
            return (
                <ul className="events">
                {items && items.map((event, i) => (
                    <li key={i}>
                        <CalendarEventClickable event={event} />
                    </li>
                    ))
                }
                </ul>
            );
        }
    })
);
export const CalendarLayout = enhance(CalendarLayoutPure);
export default CalendarLayout;


// const menu = (
//     <Menu>
//       <Menu.Item key="1">1st menu item</Menu.Item>
//       <Menu.Item key="2">2nd menu item</Menu.Item>
//       <Menu.Item key="3">3rd menu item</Menu.Item>
//     </Menu>
//   );
 
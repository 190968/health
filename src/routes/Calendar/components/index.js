import React from 'react';
import {Calendar, Card} from 'antd';


class CalendarLayout extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        return (<Card><Calendar /></Card>)
    }
}

export default CalendarLayout

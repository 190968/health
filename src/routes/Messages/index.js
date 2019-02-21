import React from 'react';
import Messages from './components/index';
import {Route} from 'react-router'

const MessagesLayout  = props => {
    return <Route path="/messages/:id?" component={Messages}/>
}

export default MessagesLayout;
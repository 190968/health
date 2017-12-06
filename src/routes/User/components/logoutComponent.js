/**
 * Created by Pavel on 04.12.2017.
 */
import React,{PropTypes} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
class NormalLogoutForm extends React.Component{

    render(){
        return(
            <Redirect to={{pathname: '/'}} />
        )

    }
}
export default NormalLogoutForm;
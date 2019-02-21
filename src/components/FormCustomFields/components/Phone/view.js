import React from 'react';
import {Icon, Tooltip} from 'antd';

export const PhoneFieldView = props => {
   // console.log(props);
    const {phone, noType=false} = props;
    if (!phone) {
        return null;
    }
    const {country, number, type, phoneNumberFormatted} = phone || {};
    const {phoneCode} = country || {};
    if (!phoneNumberFormatted) {
        return null;
    }

    return <React.Fragment>
       <Tooltip title={'Call'}><a href={'tel:'+phoneCode+number}><Icon type="phone" /></a></Tooltip> {phoneCode} {phoneNumberFormatted} {!noType && type && '('+type+')'} 
        </React.Fragment>
}
import React from 'react';

export const AddressFieldView = props => {
    //console.log(props);
    const {address} = props;
    if (!address) {
        return null;
    }
    const {country, city, line1, line2, state, zipcode} = address || {};
    const {name:countryName} = country || {};
    const {name:stateName} = state || {};
    if (!country && !city && !line1) {
        return null;
    }
    // const {country, number, type, phoneNumberFormatted} = phone || {};
    // const {phoneCode} = country || {};
    // if (!phoneNumberFormatted) {
    //     return null;
    // }



    return <React.Fragment>
        {line1 && <div>{line1}</div>}
        {line2 && <div>{line2}</div>}
        {city  && city+', '} {stateName} {zipcode} {countryName && ', '+countryName}
        </React.Fragment>
}
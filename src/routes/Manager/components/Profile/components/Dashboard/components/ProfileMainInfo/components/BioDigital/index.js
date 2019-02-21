import React from 'react';
import { Card } from 'antd';


const BioDigital = props => {
    const {items=[]} = props;
    let item = null;
    if (items.length > 0) {
        item = items[0];
    }
    const {url} = item || {};
    return  <iframe id="embedded-human" frameBorder="0" width="600" height="450" allowFullScreen="true" src={url} ></iframe>;
}

export default BioDigital; 
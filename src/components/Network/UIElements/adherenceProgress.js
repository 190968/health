import React from 'react';
import {Progress} from 'antd';


const AdherenceProgressPure = props => {
    const {value, ...otherProps} = props;
    return <Progress percent={value}  {...otherProps} />;
}

export const AdherenceProgress = AdherenceProgressPure;


export const getAdherenceColor = (networkAdherence) => {
    const {high, highColor, lowColor, med, medColor} = networkAdherence;
}
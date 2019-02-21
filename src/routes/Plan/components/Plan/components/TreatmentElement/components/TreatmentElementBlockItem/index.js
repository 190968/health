import React from 'react';
//import Decision from './containers/Decision';


export const TreatmentElementBlockItem = ({details, showChildren, isPreviewMode, mode, }) => {
    const {type, description='', element={}} = details;
    let html = null;
    console.log(type);
    switch(type) {
        case 'chemotherapy':
            console.log(details);
            console.log(element);
            const {chemotherapyElement=element} = details || {};
            const {cycles, days, notes, timesPerDay, chemotherapy={}} = chemotherapyElement || {};
            const {title:chemotherapyTitle=''} = chemotherapy;
            //console.log(details);
            html = chemotherapyTitle+', Cycles:'+cycles+', Days:'+days+', Times/Day: '+timesPerDay;
            break;
        default:
            html = description;
            break;
    }

    return html

}

export default TreatmentElementBlockItem;
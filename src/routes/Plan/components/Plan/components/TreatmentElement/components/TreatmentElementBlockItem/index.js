import React from 'react';
//import Decision from './containers/Decision';


export const TreatmentElementBlockItem = ({plan, details, showChildren, isPreviewMode, mode, }) => {
    const {type, description='', element={}} = details;
    let html = null;
    console.log(type);
    switch(type) {
        case 'chemotherapy':
            console.log(details);
            console.log(element);
            const {info} = element;
            const {chemotherapyElement=info} = details || {};
            const {cycles, days, notes, timesPerDay, chemotherapy={}} = chemotherapyElement || {};
            const {title:chemotherapyTitle=''} = chemotherapy;
            //console.log(details);
            html = chemotherapyTitle+', Cycles:'+cycles+', Days:'+days+', Times/Day: '+timesPerDay;
            break;
        /*case 'decision':
            //element
            html = <React.Fragment>
                <Decision plan={plan} elementId={element.id} isPreviewMode={isPreviewMode} mode={mode} options={element.info.options} />
            </React.Fragment>
            break;*/
        default:
            html = description;
            break;
    }

    return html

}

export default TreatmentElementBlockItem;
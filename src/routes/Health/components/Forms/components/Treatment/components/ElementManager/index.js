import React from 'react';
import {Card} from 'antd';
import { HEALTH_TREATMENT_ELEMENTS } from '../../../../../../utils';
const gridStyle = {
    width: '50%',
    textAlign: 'left',
    minHeight:90,
    cursor: 'pointer'
};

const TreatmentFormElementManager = props => {
    const {setType} = props;
    const elements = getProperElements();
    return (<Card gutter={5}>
        {elements.map(info => {
            return info[1].map(({label, type, disabled=false}) => {

                        const onClick = disabled ? () => {} : () => setType(type); 
                        const style = disabled ? {...gridStyle, 'color':'#ccc', cursor:'default'} : gridStyle;
                        return <Card.Grid style={style} key={label} span={8} onClick={onClick}>{label}</Card.Grid>
                    })
        })}
    </Card>)
}

export default TreatmentFormElementManager;


 


export const getTreatmentElementLabel = (element) => {
    const mainElements = HEALTH_TREATMENT_ELEMENTS;
    //console.log(element, 'element');
    const labels = mainElements.filter(mainElement => {
        if (mainElement.type === element.type) {
            return mainElement['label'];
        }
    })
    if (labels.length > 0) {
        return labels[0]['label'];
    }
    return '';

}

export const getProperElements = () => {
    let mainElements = HEALTH_TREATMENT_ELEMENTS;
    mainElements = mainElements.sort(function(a, b) {

        var nameA = a.label.toUpperCase(); // ignore upper and lowercase
        var nameB = b.label.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });

    mainElements = mainElements.sort(function(a, b) {
        const {disabled:disabledA=false} = a;
        const {disabled:disabledB=false} = b;
        return disabledA-disabledB;
    });
 


    let elements = [];
    elements.push(['', mainElements]);

    return elements;
}
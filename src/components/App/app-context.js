import React from 'react';

export const CustomizedLabelsContext = React.createContext();
export const NetworkContext = React.createContext();


export const CustomizedLabelsProvider = (props) => {
    /*const labels =  {
            lessons: 'Regimens',
            lesson: 'Regimen',
            activities: 'Decisions',
            activity: 'Decision',
            planstore: 'Library',
    };*/
    const {labels} = props;
        return (
            <CustomizedLabelsContext.Provider value={labels} >
                {props.children}
            </CustomizedLabelsContext.Provider>
        );
}


export const GetGlobalLabel = (props) => {
    console.log(props);
    const {type} = props;
    const {defaultValue = type} = props;
    return (
        <CustomizedLabelsContext.Consumer>
            {(context) => {
                console.log(context);
                return context[type] || defaultValue;
            }}
        </CustomizedLabelsContext.Consumer>
    );
}



import React from 'react';

export const PlanContext = React.createContext({
    plan: {},
    showElementsAsCard: props => () => {
        console.log(props);
    }
});


export const PlanContextProvider = (props) => {
    //const {plan} = props;
    return (
        <PlanContext.Provider {...props} >
            {props.children}
        </PlanContext.Provider>
    );
}

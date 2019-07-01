import React from 'react';

export const PlanContext = React.createContext({
    plan: {},
    elements: [],
});


export const PlanContextProvider = (props) => {
    const {children, ...otherProps} = props;
    return (
        <PlanContext.Provider value={otherProps} >
            {props.children}
        </PlanContext.Provider>
    );
}
export const withPlanContextProvider = Component => {
    const PlanContextProviderHOC = props => {
        // console.log(props, 'Component props');
        const {elements, plan} = props;
        return (
            <PlanContext.Provider value={{elements, plan}}>
                <Component {...props} />
            </PlanContext.Provider>
        );
    }
    return PlanContextProviderHOC;
  }

export const withPlanContext = Component => {
    const PlanContextConsumerHOC = props => {
        return (
            <PlanContext.Consumer>
                {context => {
                    const {elements=[]} = context || {};
                    console.log(context, 'context');
                    return <Component
                        {...props}
                         planElements={elements}
                    />
                }}
            </PlanContext.Consumer>
        );
    }
    return PlanContextConsumerHOC;
  }


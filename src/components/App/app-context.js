import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

export const CustomizedLabelsContext = React.createContext();
export const NetworkContext = React.createContext();



export const CustomizedLabelsProvider = (props) => {
        return (
            <CustomizedLabelsContext.Provider value={props} >
                {props.children}
            </CustomizedLabelsContext.Provider>
        );
}

export const withActiveNetwork = Component => {
    const ActiveNetworkHOC = props => {
        return (
            <CustomizedLabelsContext.Consumer>
                {(context) => {
                    const {currentNetwork={}} = context || {};
                    //console.log(context);
                    return <Component
                        {...props}
                        currentNetwork={currentNetwork}
                    />
                }}
            </CustomizedLabelsContext.Consumer>
        );
    }
    return ActiveNetworkHOC;
  }


export const GetGlobalLabel = (props) => {
    const {type} = props;
    const {defaultValue = type} = props;
    return (
        <CustomizedLabelsContext.Consumer>
            {({labels}) => {
                //console.log(context);
                return labels && labels[type] || defaultValue;
            }}
        </CustomizedLabelsContext.Consumer>
    );
}



export const ActiveUserContext = React.createContext({
    user: {},
    updateUser: () => {},
});



 const ActiveUserProviderPure = (props) => {
    const {user, setUser, updateUserInfo} = props;
    //console.log(props, 'ActiveUserProvider');
    return (
        <ActiveUserContext.Provider value={{
            setUser:setUser,
            updateUserInfo:updateUserInfo,
            user:user
        }} >
            {props.children}
        </ActiveUserContext.Provider>
    );
}

export const ActiveUserProvider = compose(
    withState('user', 'setUserState', props => props.user),
    withHandlers({
        setUser: props => user => {
            props.setUserState(user);
        },
        updateUserInfo: props => (fields) => {
            const {user} = props;
            console.log(fields);
            console.log({...user, ...fields});
            props.setUserState({...user, ...fields});
        }
    }),
)(ActiveUserProviderPure);


export const withActiveUser = Component => {
    const ActiveUserHOC = props => {
        return (
            <ActiveUserContext.Consumer>
                {context => {
                    const {user={},setUser, updateUserInfo} = context || {}
                    return <Component
                        {...props}
                         currentUser={user}
                         updateCurrentUser={setUser}
                         updateCurrentUserInfo={updateUserInfo}
                    />
                }}
            </ActiveUserContext.Consumer>
        );
    }
    return ActiveUserHOC;
  }

  export const withLogoutActiveUser = Component => {
    const ActiveUserLogoutHOC = props => {
        return (
            <ActiveUserContext.Consumer>
                {context => {
                    const {setUser} = context || {}
                    return <Component
                        {...props}
                        logoutUser={setUser}
                    />
                }}
            </ActiveUserContext.Consumer>
        );
    }
    return ActiveUserLogoutHOC;
  }
 
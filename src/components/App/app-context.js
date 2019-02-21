import React from 'react';
import {Route} from 'react-router';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { Error404 } from '../Errors/404';

export const NetworkContext = React.createContext({
    currentNetwork: {},
    currentProvider: {},
    networkModuleExists: () => {},
    setLanguage: {}
});

export const ActiveNetworkProviderPure = (props) => {
    const {children, ...otherProps} = props;
    return (
        <NetworkContext.Provider value={otherProps} >
            {children}
        </NetworkContext.Provider>
    );
}

 export const ActiveNetworkProvider = withHandlers({
    networkModuleExists: (props) => (module, setting, settingValue) => {
        const {currentNetwork} = props;
        const {modules=[]} = currentNetwork || {};
        const isExists = networkModuleExists({modules, module, setting, settingValue});
        //console.log('module "'+module+'" exists', isExists);
        return isExists;
    }
})(ActiveNetworkProviderPure);



const networkModuleExists = ({modules=[], module, setting, settingValue, settingRoles}) => {
    const m = modules && modules.find(mod => mod.placeholder === module);
    // if we didn't fund module, then return false
    if (!m) {
        return false;
    }
    // if module settings exist, compare it with the value
    if (setting) {
        // get settings from the module
        const {settings} = m || {};
        // find our settings
        const s = settings && settings.find(set => set.key === setting);
        // If we've found setting, then return it's value. otherwise use default value
        if (s) {
            // check if it's a boolean
            if (typeof(settingValue) == typeof(true)) {
                return s.value === '1';
            } else if (Number.isInteger(settingValue)) {
                return settingValue === parseInt(s.value)
            } else {
                return settingValue === s.value;
            }
        } else {
            return settingValue;
        }
    }
    return true;
};


export const withActiveNetwork = Component => {
    const ActiveNetworkHOC = props => {
        return (
            <NetworkContext.Consumer>
                {(context) => {
                    const {currentNetwork={}, currentProvider={}, networkModuleExists, setLanguage} = context || {};
                    const isProviderLevel = currentProvider && currentProvider.id && currentProvider.id !== '' || false;
                    return <Component
                        {...props}
                        isProviderLevel={isProviderLevel}
                        currentProvider={currentProvider}
                        currentNetwork={{...currentNetwork, networkModuleExists}}
                        setLanguage={setLanguage}
                    />
                }}
            </NetworkContext.Consumer>
        );
    }
    return ActiveNetworkHOC;
  }

  
  export const ifPageExists = (module, setting=null, settingValue) => Component => {
    return ifModuleExists(module, setting, settingValue, {renderError:true})(Component);
  }
  
  export const ifModuleExists = (module, setting, settingValue, opts) => Component => {
    const {renderError=false, settingRoles} = opts || {};
    const ActiveNetworkModuleHOC = props => {
        return (
            <NetworkContext.Consumer>
                {(context) => {
                    const {currentNetwork} = context || {};
                    const {modules} = currentNetwork || {};

                    const isExists = networkModuleExists({modules, module, setting, settingValue, settingRoles});

                    if (!isExists) {
                        return renderError ? <Route component={Error404} status={404} /> : null;
                    }

                    return <Component
                        {...props}
                    />
                }}
            </NetworkContext.Consumer>
        );
    }
    return ActiveNetworkModuleHOC;
  }


export const GetGlobalLabel = (props) => {
    const {type} = props;
    const {defaultValue = type} = props;
    return (
        <NetworkContext.Consumer>
            {(context) => {
                const {currentNetwork} = context || {};
                const {labels=[]} = currentNetwork || {};

                const label = labels.find(label => label.key === type);
                //console.log(context);
                //console.log(label);
                return label && label.label || defaultValue;
            }}
        </NetworkContext.Consumer>
    );
}






export const ActiveUserContext = React.createContext({
    user: {},
    setUser: () => {},
    updateUser: () => {},
    isRole: () => {},
    isSelf: () => {},
});



 const ActiveUserProviderPure = (props) => {
    const {children, ...otherProps} = props;
    return (
        <ActiveUserContext.Provider value={otherProps} >
            {props.children}
        </ActiveUserContext.Provider>
    );
}

export const ActiveUserProvider = compose(
    //withState('user', 'setUserState', props => props.user),
    withHandlers({
        setUser: props => user => {
            console.log('SET USER CONTEXT', user);
            //props.setUserState(user);
        },
        updateUserInfo: props => (fields) => {
            const {user} = props;
            //console.log(fields);
            console.log({...user, ...fields}, 'UPDATING User Info CONTEXT');
            //props.setUserState({...user, ...fields});
        },
        isAdmin: props => () => {
            const {user} = props;
            const {currentRole} = user || {};
            return currentRole === 'manager';
        },
        isRole: props => (role) => {
            const {user} = props;
            const {currentRole} = user || {};

            if (Array.isArray(role)) {
                // if we have multiple arrays
                return role.includes(currentRole);
            } else {
                return role && currentRole === role || false;
            }
        },
        isSelf: props => (userCheck) => {
            if (!userCheck) {
                return false;
            }
            const {user} = props;
            const {id} = user || {};
            return id === userCheck.id;
        }
    }),
    // lifecycle( {
    //     getDerivedStateFromProps() {
    //         fetchPosts().then(posts => {
    //           this.setState({ posts });
    //         })
    //       }
    // })
)(ActiveUserProviderPure);


export const withActiveUser = Component => {
    const ActiveUserHOC = props => {
        return (
            <ActiveUserContext.Consumer>
                {context => {
                    const {user={},setUser, updateUserInfo, isRole} = context || {}
                    // console.log('With current User', context);
                    return <Component
                        {...props}
                         currentUser={user}
                         updateCurrentUser={setUser}
                         updateCurrentUserInfo={updateUserInfo}
                         isUserRole={isRole}
                    />
                }}
            </ActiveUserContext.Consumer>
        );
    }
    return ActiveUserHOC;
  }

  export const withActiveUserSimple = Component => {
    const ActiveUserHOC = props => {
        const {user} = props;
        const {id:checkId} = user || {};
        return (
            <ActiveUserContext.Consumer>
                {context => {
                    const {user={},isSelf, isRole} = context || {};
                    const {currentRole} = user || {};
                    return <Component
                        {...props}
                         currentUser={{...user,  isProfessional: (currentRole !== 'patient' && currentRole !== 'guest') }}
                         isUserRole={isRole}
                         isSelf={user.id === checkId}
                         checkIfSelf={isSelf}
                        
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
 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {BasicRoutes, CoreNotAuthorizedRoutes, UseRoutes, CoreNotAuthorizedRoutesWithProps} from './routes';
// import extra
import { Spin, Modal, Icon } from 'antd';
import VerifyPhone from '../routes/User/containers/verifyPhoneContainer';
import { ActiveNetworkProvider, ActiveUserProvider } from '../components/App/app-context';
// import main layouts
import ManagerLayout from './components/ManagerLayout';
import PatientLayout from './components/PatientLayout';
import { withCurrentUser, withCurrentUserAndNetwork } from '../queries/user';
import { withCurrentNetwork } from '../queries/network';
import { compose, withState, withHandlers } from 'recompose';
import Register from '../routes/User/containers/registerContainer';

/**
 * Show proper layout according to current role
 */
const CoreByMode = (props) => {
	const { currentUser = {}, location } = props;
    const { currentRole = false } = currentUser;
    // console.log('currentRole', props);

    const {pathname} = location;
    if (pathname === '/logout') {
        const {store} = props;
        return <BasicRoutes store={store} />;
    }

	if (!currentRole || currentRole === 'patient' || currentRole === 'guest') {
		return <PatientLayout {...props} />;
	} else {
		return <ManagerLayout {...props} />;
	}
};



const CorePure21 = (props) => {
	const {  currentUser: user = {}, currentNetwork = {}, history } = props;
	 console.log(props, 'CorePure');
	const { labels = {} } = currentNetwork || {};

	const { id, phoneConfirmed = false, token ='' } = user || {};
    //console.log(id, 'User ID');
	if (id && !phoneConfirmed) {
		return <VerifyPhone />;
    }
	return <React.Fragment>
			<IddleTimerModal history={history} currentUser={user} />
			
			<CoreByMode {...props} />
        </React.Fragment>;
};

const CorePure2 = withCurrentUser(CorePure21);


const CorePure = (props) => {
	const routes = [...CoreNotAuthorizedRoutes, 
		{
			// path: "/login",
			component: CorePure2 ,
			//component: <CorePure2 {...props}/>,
			// exact:true,
			isPublic:true,
		}
	]
	return <UseRoutes routes={routes} {...props} />;
	// 	<Switch>
	// 	<
	// 		<Route path="/register" component={Register} />

	// 		<Route component={} />
	// 	</Switch>
	// </>
}

const IddleTimerModalPure = props => {
	const {isIddle, currentUser: user = {}} = props;
	const { id, phoneConfirmed = false, token ='' } = user || {};
	return <React.Fragment>
	{isIddle ? (
					<Modal
						title="No Activity"
						visible={true}
						onCancel={props._onLogout}
						onOk={props._onActive}
						okText="Continue"
						cancelText="Logout"
					>
						You've been inactive for the past 15 mins. Would you like to continue or logout
					</Modal>
				) : id && token !== '' && (
					<IdleTimer
						element={document}
						onIdle={props._onIdle}
						timeout={1000 * 60 * 15}
						format="MM-DD-YYYY HH:MM:ss.SSS"
						debounce={250}
					/>
				)}
	</React.Fragment>;
}
const enhanceIddle = compose(
	withState('isIddle', 'setIddle', false),
	withHandlers({
		_onLogout: (props) => () => {
            // do the logout
            props.setIddle(false);
			props.history.push('/logout');
		},
		_onActive: (props) => () => {
			// continue using the system if token is OK
			props.setIddle(false);
		},
		_onIdle: (props) => () => {
			props.setIddle(true);
		}
	})
);
const IddleTimerModal = enhanceIddle(IddleTimerModalPure);

const enhance = compose(
    withRouter,
	// withState('isIddle', 'setIddle', false),
	// withHandlers({
	// 	_onLogout: (props) => () => {
    //         // do the logout
    //         props.setIddle(false);
	// 		props.history.push('/logout');
	// 	},
	// 	_onActive: (props) => () => {
	// 		// continue using the system if token is OK
	// 		props.setIddle(false);
	// 	},
	// 	_onIdle: (props) => () => {
	// 		props.setIddle(true);
	// 	}
	// })
);

const CoreEnhanced = enhance(CorePure);

const CoreWithNetworkUser = (props) => {
    const { loading,  currentUser: user = {}, currentNetwork = {}, currentProvider={}, setLanguage } = props;
	if (loading) {
		return (
			<div
				style={{
					height: '100%',
					width: '100%',
					overflow: 'auto',
					display: 'flex',
					top: '50%',
					position: 'absolute',
					minHeight: '100vh',
					flexDirection: 'column'
				}}
			>
				<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
			</div>
		);
	}
	// console.log(props, 'PPPPPPPProps');
    return <ActiveNetworkProvider currentNetwork={currentNetwork} currentProvider={currentProvider} setLanguage={setLanguage}>
			<ActiveUserProvider user={user} >
                <CoreEnhanced {...props} />
            </ActiveUserProvider>
		</ActiveNetworkProvider>;
}

export default (CoreWithNetworkUser);

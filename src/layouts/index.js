import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {BasicRoutes} from './routes';
// import extra
import { Spin, Modal, Icon } from 'antd';
import VerifyPhone from '../routes/User/containers/verifyPhoneContainer';
import { CustomizedLabelsProvider, ActiveUserProvider } from '../components/App/app-context';
// import main layouts
import ManagerLayout from './components/ManagerLayout';
import PatientLayout from './components/PatientLayout';
import { withCurrentUser, withCurrentUserAndNetwork } from '../queries/user';
import { withCurrentNetwork } from '../queries/network';
import { compose, withState, withHandlers } from 'recompose';

/**
 * Show proper layout according to current role
 */
const CoreByMode = (props) => {
	const { currentUser = {}, location } = props;
    const { currentRole = false } = currentUser;
    console.log('currentRole', props);

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

const CorePure = (props) => {
	const { isIddle,  currentUser: user = {}, currentNetwork = {} } = props;
	console.log('CorePure', props);
	const { labels = {} } = currentNetwork;

	const { id, phoneConfirmed = false, token ='' } = user || {};
    //console.log(id, 'User ID');
	if (id && !phoneConfirmed) {
		return <VerifyPhone />;
    }
	return (
        <React.Fragment>
				{isIddle ? (
					<Modal
						title="No Activity"
						visible={true}
						onCancel={props._onLogout}
						onOk={props._onActive}
						okText="Continue"
						cancelText="Logout"
					>
						You've been inactive. Would you like to continue or logout
					</Modal>
				) : id && token !== '' ? (
					<IdleTimer
						element={document}
						idleAction={props._onIdle}
						timeout={1000 * 60 * 15}
						format="MM-DD-YYYY HH:MM:ss.SSS"
					>
						<CoreByMode {...props} blabla />
					</IdleTimer>
				) : (
					<PatientLayout {...props} />
                )}
                </React.Fragment>
	);
};



const enhance = compose(
    withRouter,
    withCurrentUser,
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

const CoreEnhanced = enhance(CorePure);

const CoreWithNetworkUser = (props) => {
    const { loading,  currentUser: user = {}, currentNetwork = {} } = props;
    const { labels = {} } = currentNetwork;
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
    
    return <CustomizedLabelsProvider currentNetwork={currentNetwork} labels={labels}>
			<ActiveUserProvider user={user}>
                <CoreEnhanced {...props} />
            </ActiveUserProvider>
		</CustomizedLabelsProvider>;
}

export default withCurrentUserAndNetwork(CoreWithNetworkUser);

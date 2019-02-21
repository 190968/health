import React from 'react';
import {Tooltip, Button} from 'antd';
import { FormattedMessage } from 'react-intl';
import AcceptPlan from '../../../../containers/AcceptPlan';
import DefaultI18nEn from '../../../../../../i18n/en';
import { withToggleModal } from '../../../../../../components/Modal';
import { withActiveUserSimple } from '../../../../../../components/App/app-context';
import { compose, withProps, branch, renderComponent, withHandlers } from 'recompose';
import { withJoinUserPlanMutation } from '../../mutations';
const AcceptUserPlanButtonPure = (props) => {
    const { showModal, toggleModal, asMenuItem=false, asIcon = true, ...otherProps } = props;
    const {userPlan} = otherProps
	const {plan} = userPlan || {};
    const title = <FormattedMessage  values={{title: plan.title}} {...DefaultI18nEn.acceptSomething} />;
	return (
		<React.Fragment>
			{showModal && <AcceptPlan {...otherProps} modalTitle={title} onHide={toggleModal} />}
				<Tooltip title={title} >
					<Button size={'small'} onClick={toggleModal} ><FormattedMessage {...DefaultI18nEn.accept} /></Button>
				</Tooltip>
		</React.Fragment>
	);
};

const JoinUserPlanButtonPure = props => {
	const { showModal, toggleModal, asMenuItem=false, asIcon = true, onClick, ...otherProps } = props;
    const {userPlan} = otherProps
	const {plan} = userPlan || {};
    const title = <FormattedMessage  values={{title: plan.title}} {...DefaultI18nEn.acceptSomething} />;
	return (
		<React.Fragment>
				<Tooltip title={title} >
					<Button size={'small'} onClick={onClick} ><FormattedMessage {...DefaultI18nEn.accept} /></Button>
				</Tooltip>
		</React.Fragment>
	);
}
const JoinUserPlanButton = compose(
	withJoinUserPlanMutation,
	withHandlers({
		onClick: props => (e) => {
			e.preventDefault();
			props.joinUserPlan();
		}
	})
)(JoinUserPlanButtonPure);
 
const enhance = compose(
	withActiveUserSimple,
	withProps(props => {
		const {userPlan, checkIfSelf} = props
		const {user} = userPlan || {};
		const isSelf = checkIfSelf(user);
		console.log(isSelf,'isSelf plan')
		return {isSelf};
	}),
	branch(props => {
		const {userPlan, checkIfSelf} = props
		const {plan} = userPlan || {};
		const {type} = plan || {};
		// plans that don't need any settings
		const getImmediatelyTypes = ['medication', 'tracker'];
		if (getImmediatelyTypes.includes(type)) {
			return true;
		}
		return !props.isSelf;
	}, renderComponent(JoinUserPlanButton)),
	withToggleModal
);
export const AcceptUserPlanButton = enhance(AcceptUserPlanButtonPure);
export default AcceptUserPlanButton;

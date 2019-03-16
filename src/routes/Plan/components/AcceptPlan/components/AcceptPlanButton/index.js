import React from 'react';
import {Tooltip, Button} from 'antd';
import { FormattedMessage } from 'react-intl';
import AcceptPlan from '../../../../containers/AcceptPlan';
import DefaultI18nEn from '../../../../../../i18n/en';
import { withToggleModal } from '../../../../../../components/Modal';
const AcceptPlanButtonPure = (props) => {
    const { showModal, toggleModal, label, asMenuItem=false, disabled=false, asIcon = true, ...otherProps } = props;
	const {plan} = otherProps;
	const {title:planTitle} = plan || {};
    const title = <FormattedMessage  values={{title: planTitle}} {...DefaultI18nEn.acceptSomething} />;
	if (disabled) {
		return label;
	}
	return (
		<React.Fragment>
			{showModal && <AcceptPlan {...otherProps} modalTitle={title} onHide={toggleModal} />}
				<Tooltip title={title} >
					{label ? <a  onClick={toggleModal}>{label}</a> : <Button size={'small'} onClick={toggleModal} ><FormattedMessage {...DefaultI18nEn.accept} /></Button>}
				</Tooltip>
		</React.Fragment>
	);
};
 
export const AcceptPlanButton = withToggleModal(AcceptPlanButtonPure);
export default AcceptPlanButton;

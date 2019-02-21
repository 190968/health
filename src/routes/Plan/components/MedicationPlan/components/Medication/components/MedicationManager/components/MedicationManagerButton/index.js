import React from 'react';
import { Icon, Tooltip, Button, Popover } from 'antd';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import MedicationManager from '../../../../containers/MedicationManager';
import './index.less';
import { FormattedMessage } from 'react-intl';
import {compose, withState, branch} from 'recompose';

const MedicationManagerButton = (props) => {
	const { showModal, toggleModal, asMenuItem=false, asIcon = true, ...otherProps } = props;
	const { medication, user } = otherProps;
	return (
		<React.Fragment>
			{showModal && <MedicationManager {...otherProps} onHide={toggleModal} />}

			{medication ? (
				<Tooltip title={<FormattedMessage id={'edit.something'} values={{text: <FormattedMessage id={'medication'} defaultMessage={'Medication'}  />}} defaultMessage={'Edit {text}'}  />} >
                {asIcon ? <Icon type="edit" theme="outlined" className={'pointer'} onClick={toggleModal} /> : <span className={'pointer'} onClick={toggleModal} ><FormattedMessage id={'edit'} defaultMessage={'Edit'} /></span>}
					
				</Tooltip>
			) : (
				asMenuItem ? <span className={'pointer'} onClick={toggleModal} ><FormattedMessage id={'add.something'} values={{text: <FormattedMessage id={'medication'} defaultMessage={'Medication'}  />}} defaultMessage={'Add {text}'}  /></span>: (
				<Tooltip title={<FormattedMessage id={'add.something'} values={{text: <FormattedMessage id={'medication'} defaultMessage={'Medication'}  />}} defaultMessage={'Add {text}'}  />} >
					<Button icon={'plus'} size={'small'} onClick={toggleModal} />
				</Tooltip>)
			)}
		</React.Fragment>
	);
};

// const withSelectDrug = withState('drug', 'setDrug');
const enhance = compose(
    withToggleModal,
    // branch(props => !props.medication, withSelectDrug)
);
export default enhance(MedicationManagerButton);

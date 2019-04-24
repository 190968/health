import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withToggleModal } from '../../../../../../../../components/Modal';
import DefaultI18nEn from '../../../../../../../../i18n/en';
import ScreeningPopulation from '../../../../containers/Population';

const ScreeningPopulationButtonPure = props => {
    const { showModal, toggleModal, label, icon, showLabel=false,  ...otherProps } = props;
    const {screening} = otherProps;
    const {title} = screening || {};
    // const titleButton = <FormattedMessage values={{ title, edit:screening && screening.id !== '' }} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <ScreeningPopulation {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal} >{showLabel ? label : title}</a>
    </React.Fragment>
}

export const ScreeningPopulationButton = withToggleModal(ScreeningPopulationButtonPure);
export default ScreeningPopulationButton;
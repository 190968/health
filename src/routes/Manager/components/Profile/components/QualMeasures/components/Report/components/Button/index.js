import React from 'react';
import Truncate from 'react-truncate';
import { QualityMeasureReport } from '../../../../containers/Report';
import { withToggleModal } from '../../../../../../../../../../components/Modal';


const QualityMeasureReportButtonPure = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    const {qm} = otherProps;
    //const title = <FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {showModal && <QualityMeasureReport {...otherProps} onHide={toggleModal} />}

        <span onClick={toggleModal}>{qm.title}</span>
    </React.Fragment>
}

export const QualityMeasureReportButton = withToggleModal(QualityMeasureReportButtonPure);
export default QualityMeasureReportButton;
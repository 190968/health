import { Card, Col, Row } from 'antd';
import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { AddressFieldView } from '../../../../../../../../components/FormCustomFields/components/Address/view';
import { PhoneFieldView } from '../../../../../../../../components/FormCustomFields/components/Phone/view';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList/DescriptionList';
import Avatar from '../../../../../../../User/components/Avatar';
import ProfileManager from '../../../ProfileManager';
import BioDigitalButton from './components/BioDigitalButton';




const CancerTitlePure = ({ cancer, openEditorModal, hideEditorModal, openEditor }) => {
    return <React.Fragment>
        <a onClick={openEditorModal}>{cancer.title}</a>
        {openEditor && <ProfileManager onHide={hideEditorModal} cancer={cancer} />}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
            openEditor: false,
        }),
        {
            openEditorModal: ({ counter }) => (value) => ({
                openEditor: true
            }),
            hideEditorModal: ({ counter }) => (value) => ({
                openEditor: false
            }),
        }
    )
);

const CancerTitle = enhanceTitle(CancerTitlePure);

const ProfileMainInfo = props => {

    const { user } = props;

    let cancerName = 'Small Cell Lung Cancer';
    let stageName = 'T1 N2 M0 Stage 1';

    const { genderText, age, email, birthday = '', phone, address, getUserNetwork = {}, getInsurance = {}, getDiagnosis = {} } = user;
    //
    const { lastLogin, joinedDate } = getUserNetwork;

    const { memberId,
        groupNumber = '',
        payer = {} } = getInsurance;
    const { name: payerName = '' } = payer;

    const { code = {} } = getDiagnosis || {};
    const { name: DiagnosisName } = code;


    const demographicDetails = [
        ['Member ID', memberId],
        ['Gender', genderText],
        ['Age', age],
        // ['Medication Adherence', ],
        // ['Adherence', ],
        ['Phone', phone && <PhoneFieldView phone={phone} />],
        ['Address', address && <AddressFieldView address={address} />],
        ['Insurance', payerName],
       
        ['Last Login', lastLogin],
       
    ];
    const medicalDetails =  [
        ['Diagnosis', (DiagnosisName || null/*<span>Add Diagnosis</span>*/)],
        ['Cancer', <span>{cancerName} <BioDigitalButton /></span>],
        ['Stage', stageName],
    ];

    return <Card >
        <Row>
            <Col md={6}><Avatar info={user} size="huge" /></Col>
            <Col md={18}>
                <Row>
                    <Col md={12}>
                    <DescriptionList col={1} row={6} aligh={'right'} details={demographicDetails} />
                    </Col>
                    <Col md={12}>
                    <DescriptionList col={1} row={6} aligh={'right'} details={medicalDetails} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>;

}
export default ProfileMainInfo;
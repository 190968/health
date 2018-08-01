import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Radio, Icon, Tooltip } from 'antd';
import PatientsTable from './containers/PatientsTable'
import { PageHeaderLayout } from "../../../../components/Layout/PageHeaderLayout/index";
import { compose, withState, withHandlers, withStateHandlers } from 'recompose';
import PatientInvite from "./containers/PatientInvite";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export class Patients extends React.Component {

    render() {
        const { loading } = this.props;

        if (loading) {
            return <div>Loading...</div>
        }
        const { onSearch, patients, emitEmpty, selectedObj, searchText, selectedCount, visibleModal, openShowButton, hideShowButton, openModal, hideModal, showButton, sliderChange } = this.props;
        const actions = <React.Fragment>
            <RadioGroup defaultValue="all" style={{ marginRight: 10 }} >
                <RadioButton value="all">All</RadioButton>
                <RadioButton value="active">Active</RadioButton>
                <RadioButton value="suspended">Suspended</RadioButton>
                <RadioButton value="guests">Guests</RadioButton>
            </RadioGroup>
            <Tooltip title="Add New Patient"><Button onClick={openModal} type="primary"><Icon type="plus" /></Button></Tooltip>
        </React.Fragment>;
        const plansTotal = this.props.total;
        return (
            <PageHeaderLayout title={'Patients' + (plansTotal > 0 ? ' (' + plansTotal + ')' : '')}
                content=""
                // extraContent={<Input.Search style={{width:200}} />}
                action={actions}
                mainAffix
            >

                <Card type="table">
                    <PatientsTable patients={patients} selectedCount={selectedCount} selectedObj={selectedObj} openShowButton={openShowButton} hideShowButton={hideShowButton} showButton={showButton} onSearch={onSearch} emitEmpty={emitEmpty} searchText={searchText} sliderChange={sliderChange} />
                </Card>
                {visibleModal && <PatientInvite onHide={hideModal}  />}
            </PageHeaderLayout>);
    }
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        }
    }),
);
export default enhance(Patients);
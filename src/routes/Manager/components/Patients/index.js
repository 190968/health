import React from 'react';
import { Card, Icon, Button, Tooltip, Switch } from 'antd';
import PatientsTable from './containers/PatientsTable'
import { PageHeaderLayout } from "../../../../components/Layout/PageHeaderLayout/index";
import { compose, withState, withHandlers } from 'recompose';
import PatientManager from "./containers/PatientManager";
import {CohortsHeaderFilter} from '../Cohorts/containers/HeaderFilter';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../i18n/en';
import { CardQuickFilter } from '../../../../components/Card/components/CardQuickFilter';
import { CardExtraItems } from '../../../../components/Card/components/CardExtraSplit';



const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'suspended', label: <FormattedMessage {...DefaultI18nEn.filterSuspended} /> },
    { value: 'guests', label: <FormattedMessage {...DefaultI18nEn.filterGuests} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

// const CampaignsList = props => {
//     const {total} = props;
//     return <PageHeaderLayout
//         title={'Campaigns'+ (total > 0 ? '('+total+')' : '')}
//         action={<CardExtraItems>
//             <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
//             <CampaignManagerButton icon={'plus'} refetch={props.refetch} />
//             </CardExtraItems>}
//     >
//         <Card type={'table'}><CampaignsTable {...props} /></Card>
//     </PageHeaderLayout>
// }



const Patients = props => {

        //const { loading } = this.props;
        console.log(props);
        const { onSearch, patients, emitEmpty, selectedObj, searchText, selectedCount, visibleModal, openShowButton, hideShowButton, openModal, hideModal, showButton, sliderChange, hideModalReset, ...otherProps } = props;
        const actions = <CardExtraItems>
                        <Tooltip title={props.showFilters ? 'Hide Filters' : 'Show Filters'}> <Switch checkedChildren="Filters" unCheckedChildren="Filters" style={{marginRight:10, marginTop:5}} onChange={props.toggleFilters} defaultChecked={props.showFilters} /></Tooltip> 
                        <CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
                        <Tooltip title="Add New Patient"><Button onClick={openModal} type="primary"><Icon type="plus" /></Button></Tooltip>
                     </CardExtraItems>

        const total = props.total;
        return (
            <PageHeaderLayout title={'Patients' + (total > 0 ? ' (' + total + ')' : '')}
                content=""
                // extraContent={<Input.Search style={{width:200}} />}
                action={actions}
                mainAffix
            >
            {props.showFilters && <Card type={'filter'}>
                <CohortsHeaderFilter activeFilters={props.activeFilters}  onChange={props.updateFilters} onReset={props.resetActiveFilters}  />
            </Card>}
                <Card type="table" >
                    <PatientsTable  {...otherProps} patients={patients} selectedCount={selectedCount} selectedObj={selectedObj} openShowButton={openShowButton} hideShowButton={hideShowButton} showButton={showButton} emitEmpty={emitEmpty} searchText={searchText} sliderChange={sliderChange} />
                </Card>
                {visibleModal && <PatientManager onHide={hideModalReset}  />}
            </PageHeaderLayout>);
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        },
        hideModalReset: props => () => {
            console.log(props);
            // refetch the list
            props.refetchList();
            props.setOpenManager(false);
        }
    }),
);
export default enhance(Patients);
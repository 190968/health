import React from 'react';
import {Input, Card, Table, Radio, Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers, withProps} from 'recompose';
////import ChemotherapyManager from './containers/ChemotherapyManager';
import sort from '../../../../../../components/Tables/sort'
import ClinicalTrialView from '../../containers/ClinicalTrialView';
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import { TableWithMessage } from '../../../../../../components/Tables';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CancerTitlePure = ({clinicalTrial, openView, openViewModal, hideViewModal}) => {
    return <React.Fragment>
        <a onClick={openViewModal}>{clinicalTrial.title}</a>
        {openView && <ClinicalTrialView onHide={hideViewModal} clinicalTrial={clinicalTrial} asModal/>}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
            openView: false,
        }),
        {
            openViewModal: ({counter}) => (value) => ({
                openView: true
            }),
            hideViewModal: ({counter}) => (value) => ({
                openView: false
            }),
        }
    )
);
const Title = enhanceTitle(CancerTitlePure);

const ClinicalTrialsListPure = props => {
    const {items = [], total, changePage, loading = false} = props;
    const suffix = props.searchText ? <Icon type="close-circle-o" onClick={props.emitEmpty}/> : <Icon type="search"/>
    const columns = [{
        title: 'ID',
        dataIndex: 'nctId',
        key: 'nctId',
        width: 140,
        // sorter: (a, b) => a.nctId - b.nctId,
        // filterDropdown: (
        //         <Input
        //             suffix={suffix}
        //             ref={ele => this.searchInput = ele}
        //             placeholder="Search name"
        //             value={props.searchText}
        //             onChange={props.onSearch}
        //             onPressEnter={props.onSearch}
        //         />
        // ),
        // filterIcon: <Icon type="search"/>,
    }, {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        // sorter: (a, b) => sort(a, b, "title"),
        // render: (title, info) => {
        //     return <Title clinicalTrial={info}/>;
        // },
        // filterDropdown: (
        //         <Input
        //              suffix={suffix}
        //             ref={ele => this.searchInput = ele}
        //             placeholder="Search name"
        //             // value={searchText}
        //             //onChange={onSearch}
        //             //onPressEnter={onSearch}
        //         />
        // ),
        // filterIcon: <Icon type="search"/>,
    },

    ];
    const dataSource = items.map((cancer, i) => ({...cancer, key: i}));
    const pageOpts = {
        onChange: changePage,
        total: total,
        hideOnSinglePage: true/*, showSizeChanger:true*/
    };


   
    return (<React.Fragment>
        <PageHeaderLayout title={'Clinical Trials ' + (total > 0 ? ' (' + total + ')' : '')}
                          content=""
            // extraContent={<Input.Search style={{width:200}} />}
                        //   action={actions}
        >

            <Card type="table">
                <TableWithMessage
                 dataSource={dataSource} 
                 columns={columns} 
                 total={total}
                 loading={loading}
                 onChange={props.handleTableChange}
                 />
            </Card>
        </PageHeaderLayout>
    </React.Fragment>);
}


const enhance = compose(
    // withState('openManage', 'setOpenManager', false),
    withHandlers({
        changePage: props => (page) => {
            const {lastCursor} = props;
            props.changePage(lastCursor);
        },
    })
);

export default enhance(ClinicalTrialsListPure);
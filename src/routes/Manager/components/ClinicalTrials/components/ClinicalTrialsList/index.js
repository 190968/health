import React from 'react';
import {Input, Card,Table,  Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers, withProps} from 'recompose';
////import ChemotherapyManager from './containers/ChemotherapyManager';
import ClinicalTrialView from '../../containers/ClinicalTrialView';

const CancerTitlePure = ({clinicalTrial, openView, openViewModal, hideViewModal}) => {
    return <React.Fragment>
        <a onClick={openViewModal}>{clinicalTrial.title}</a>
        {openView &&  <ClinicalTrialView onHide={hideViewModal} clinicalTrial={clinicalTrial} asModal />}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
            openView: false,
        }),
        {
            openViewModal: ({ counter }) => (value) => ({
                openView: true
            }),
            hideViewModal: ({ counter }) => (value) => ({
                openView: false
            }),
        }
        )
);
const Title = enhanceTitle(CancerTitlePure);

const ClinicalTrialsListPure = props => {
    const {items=[], total, changePage, loading=false} = props;
    const columns = [ {
        title: 'ID',
        dataIndex: 'nctId',
        key: 'nctId',
        width: 140,
    },{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            //width: '60%',
            // sorter: (a, b) => a.title.length - b.title.length,
             render: (title, info) => {
                 return <Title clinicalTrial={info}/>;
             },
            // // search
            // filterDropdown: (
            //     <div className="custom-filter-dropdown">
            //         <Input
            //             ref={ele => this.searchInput = ele}
            //             placeholder="Search name"
            //             value={this.state.searchText}
            //             onChange={this.onInputChange}
            //             onPressEnter={this.onSearch}
            //         />
            //         <Button type="primary" onClick={this.onSearch}>Search</Button>
            //     </div>
            // ),
            // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            // filterDropdownVisible: this.state.filterDropdownVisible,
            // onFilterDropdownVisibleChange: (visible) => {
            //     this.setState({
            //         filterDropdownVisible: visible,
            //     }, () => this.searchInput && this.searchInput.focus());
            // },
        },

        ];
    const dataSource = items.map((cancer, i) => ({...cancer, key:i}));
    const pageOpts = {
        onChange: changePage,
        total: total,
        hideOnSinglePage: true/*, showSizeChanger:true*/
    };
    return (<React.Fragment>
        <Card type="table" title={'Clinical Trials '+ (total > 0 ? ' ('+total+')' : '')} >
            <Table dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>
    </React.Fragment>);
}


const enhance = compose(
    // withState('openManage', 'setOpenManager', false),
    withHandlers({
        changePage: props => (page) => {
            console.log(props);
            const {lastCursor} = props;
            props.changePage(lastCursor);
        },
    })
);

export default enhance(ClinicalTrialsListPure);
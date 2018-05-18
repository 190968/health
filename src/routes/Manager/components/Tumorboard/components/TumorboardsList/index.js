import React from 'react';
import {Input, Card,Table,  Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers, withProps} from 'recompose';
////import ChemotherapyManager from './containers/ChemotherapyManager';
import TumorboardView from '../../containers/TumorboardView';

const CancerTitlePure = ({tumorboard, openView, openViewModal, hideViewModal, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openViewModal}>{tumorboard.title}</a>
        {openView &&  <TumorboardView onHide={hideViewModal} tumorboard={tumorboard} asModal />}
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

const TumorobardsListPure = props => {
    const {items=[], total, openManage, addCancer, hideManager} = props;
    const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            // sorter: (a, b) => a.title.length - b.title.length,
             render: (title, info) => {
                 return <Title tumorboard={info}/>;
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
        }];
    const dataSource = items.map((cancer, i) => ({...cancer, key:i}))
    return (<React.Fragment>
        <Card type="table" title={'Tumorboards '+ (total > 0 ? ' ('+total+')' : '')} >
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
    </React.Fragment>);
}


const enhance = compose(
    // withState('openManage', 'setOpenManager', false),
    // withHandlers({
    //     addCancer: props => () => {
    //         props.setOpenManager(true);
    //     },
    //     hideManager: props => () => {
    //         props.setOpenManager(false);
    //     }
    // })
);

export default enhance(TumorobardsListPure);
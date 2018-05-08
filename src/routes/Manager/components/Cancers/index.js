import React from 'react';
import {Input, Card,Table,  Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import CancerManager from './containers/CancerManager';

const CancerTitlePure = ({cancer, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openEditorModal}>{cancer.title}</a>
        {openEditor &&  <CancerManager onHide={hideEditorModal} cancer={cancer} />}
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

const CancersPure = props => {

    const {cancers=[], total, openManage, addCancer, hideManager} = props;
    const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            // sorter: (a, b) => a.title.length - b.title.length,
             render: (title, info) => {
                 return <CancerTitle cancer={info}/>;
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
    const dataSource = cancers.map((cancer, i) => ({...cancer, key:i}))
    return (<React.Fragment>
        <Card type="table" title={'Cancers'+ (total > 0 ? ' ('+total+')' : '')} extra={<Tooltip title="Add New Cancer"><Button size="small" onClick={addCancer}><Icon type="plus"  /></Button></Tooltip>}>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
        {openManage && <CancerManager onHide={hideManager} />}
    </React.Fragment>);
}


const enhance = compose(
    withState('openManage', 'setOpenManager', false),
    withHandlers({
        addCancer: props => () => {
            props.setOpenManager(true);
        },
        hideManager: props => () => {
            props.setOpenManager(false);
        }
    })
);

export default enhance(CancersPure);
//
// export default class Stages extends React.Component {
//     state = {
//         addStage:false,
//         editStageId:'',
//         // for search
//         filterDropdownVisible: false,
//         searchText: '',
//         filtered: false,
//         //
//         filteredInfo: null,
//         sortedInfo: {},
//     };
//
//     static defaultProps = {
//         pathways:[],
//         total:0
//     }
//
//     addStage = () => {
//         this.setState({addStage:true});
//     }
//
//     openEdit = (id) => {
//         this.setState({addStage:true, editStageId:id});
//     }
//
//     hideManager = () => {
//         this.setState({addStage:false, editStageId:''});
//     }
//
//     handleChange = (pagination, filters, sorter) => {
//
//         this.setState({
//             filteredInfo: filters,
//             sortedInfo: sorter,
//         });
//     }
//
//
//     render() {
//         const {loading} = this.props;
//         let { sortedInfo } = this.state;
//         const columns = [{
//             title: 'Title',
//             dataIndex: 'title',
//             key: 'title',
//             sorter: (a, b) => a.title.length - b.title.length,
//             render: (title, info) => {
//                 return <span onClick={() => this.openEdit(info.id)}>{title}</span>
//             },
//             // search
//             filterDropdown: (
//                 <div className="custom-filter-dropdown">
//                     <Input
//                         ref={ele => this.searchInput = ele}
//                         placeholder="Search name"
//                         value={this.state.searchText}
//                         onChange={this.onInputChange}
//                         onPressEnter={this.onSearch}
//                     />
//                     <Button type="primary" onClick={this.onSearch}>Search</Button>
//                 </div>
//             ),
//             filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
//             filterDropdownVisible: this.state.filterDropdownVisible,
//             onFilterDropdownVisibleChange: (visible) => {
//                 this.setState({
//                     filterDropdownVisible: visible,
//                 }, () => this.searchInput && this.searchInput.focus());
//             },
//         }/*, {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (text, info) => {
//                 return info.isActive ? 'Active' : 'Inactive'
//             },
//             filters: [
//                 {text: 'Active', value: true},
//                 {text: 'InActive', value: false},
//             ],
//             onFilter: (value, record) => record.isActive.includes(value),
//             sorter: (a, b) => a.isActive - b.isActive,
//             sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
//         }, {
//             title: 'Date',
//             dataIndex: 'createdAt',
//             key: 'date',
//             render: (info) => moment(info).format('L'),
//         }*/];
//
//
//     }
// }
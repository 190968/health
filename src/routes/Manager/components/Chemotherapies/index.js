import React from 'react';
import {Input, Card,Table, Radio, Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import ChemotherapyManager from './containers/ChemotherapyManager';
import sort from '../../../../components/Tables/sort'
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CancerTitlePure = ({chemotherapy, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openEditorModal}>{chemotherapy.title}</a>
        {openEditor &&  <ChemotherapyManager onHide={hideEditorModal} chemotherapy={chemotherapy} />}
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

const ChemotherapiesPure = props => {
    const {cancers=[], total, openManage, addCancer, hideManager} = props;
    const suffix = props.searchText ? <Icon type="close-circle-o" onClick={props.emitEmpty}/> : <Icon type="search"/>
    const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter:(a, b) => sort(a,b,"title"),
             render: (title, info) => {
                 return <CancerTitle chemotherapy={info}/>;
             },
        filterDropdown: (
                <Input
                    suffix={suffix}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search name"
                    value={props.searchText}
                    onChange={props.onInputChange}
                    onPressEnter={props.onSearch}
                />           
        ),
        filterIcon: <Icon type="search"/>,
        }];
    const dataSource = cancers.map((cancer, i) => ({...cancer, key:i}))
    const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New Chemotherapy"><Button type="primary" onClick={addCancer}><Icon type="plus" /></Button></Tooltip>
    </React.Fragment>;

    return (<React.Fragment>
         <PageHeaderLayout title={'Chemotherapies'+ (total > 0 ? ' ('+total+')' : '')}
                          content=""
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >

        <Card type="table">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
        </PageHeaderLayout>
        {openManage && <ChemotherapyManager onHide={hideManager} />}
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

export default enhance(ChemotherapiesPure);
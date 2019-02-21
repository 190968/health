import React from 'react';
import {Input, Card,Table, Radio, Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import ChemotherapyManager from './containers/ChemotherapyManager';
import sort from '../../../../components/Tables/sort'
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import { TableWithMessage } from '../../../../components/Tables';
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
             render: (title, info) => {
                 return <CancerTitle chemotherapy={info}/>;
             },
        
        }];
    const dataSource = cancers.map((cancer, i) => ({...cancer, key:i}))
    const actions = <React.Fragment>
        <Tooltip title="Add New Chemotherapy"><Button type="primary" onClick={addCancer}><Icon type="plus" /></Button></Tooltip>
    </React.Fragment>;

    return (<React.Fragment>
         <PageHeaderLayout title={'Chemotherapies'+ (total > 0 ? ' ('+total+')' : '')}
                          content=""
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >

        <Card type="table">
            <TableWithMessage
             dataSource={dataSource} columns={columns} total={total} />
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
import React from 'react';
import moment from 'moment';
import {withApollo} from 'react-apollo';
import {Input, Card, Table, Button, Icon, Tooltip, Radio} from 'antd';
import {TumorobardQueryOptions} from "../../queries";
import {compose, withState, withHandlers, withStateHandlers, withProps} from 'recompose';
import sort from '../../../../../../components/Tables/sort'
////import ChemotherapyManager from './containers/ChemotherapyManager';
import TumorboardView from '../../containers/TumorboardView';
import TumorboardAddButton from './components/TumorboardAddButton';
import TumorboardEdit from './components/TumorboardEdit';
import {PageHeader} from "../../../../../../components/Layout/PageHeader/index";
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {SpinIndicator} from "../../../../../../components/Loading/index";
import { TableColumnSearch } from '../../../../../../components/Tables/TableColumn';
import { TableWithMessage } from '../../../../../../components/Tables';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CancerTitlePure = ({tumorboard, openView, openViewModal, hideViewModal, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openViewModal}>{tumorboard.title}</a>
        {openView && <TumorboardView onHide={hideViewModal} tumorboard={tumorboard} asModal/>}
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



const TumorobardsList= props => {
    const {items = [], total, loading, openManage, addCancer, hideManager} = props;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: true,//(a, b) => sort(a, b, "title"),
        render: (title, info) => {
            return <Title tumorboard={info}/>;
        },
        filterDropdown: (
                <TableColumnSearch  />
        ),
        filterIcon: <Icon type="search"/>,
    },
        {
            title: 'Lead',
            dataIndex: 'lead',
            key: 'lead',
            render: (title, info) => {
                return <AvatarWithName user={info.lead} widget />
            },
            sorter: (a, b) => sort(a, b, "lead"),
        },
        {
            title: 'Date',
            dataIndex: 'startDate',
            key: 'date',
            render: (title, info) => {
                return moment(info.startDate).format('L');
            },
            sorter: (a, b) => a.startDate - b.startDate,
            width: 110,

        },
        {
            title: 'Time',
            dataIndex: 'startTime',
            key: 'time',
            render: (title, info) => {
                return moment(title).format('LT');
            },
            sorter: (a, b) => a.startTime - b.startTime,
            width: 100,

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '# Invitee',
            key: 'invitee',
            render: (title, info) => {
                const {participants = []} = info;
                return participants.length;
            },
        },
        {
            title: '# Cases',
            key: 'cases',
            render: (title, info) => {
                const {getCases = []} = info;
                return getCases.length;
            },
        },
        {
            title: '',
            key: 'action',
            width: 50,
            render: (text, record) => (
                <TumorboardEdit tumorboard={record}/>
            ),
        }];
    const dataSource = items.map((cancer, i) => ({...cancer, key: i}));
   
    return (<React.Fragment>
        <PageHeaderLayout title={'Tumor Boards ' + (total > 0 ? ' (' + total + ')' : '')}
                          content=""
                          action={<TumorboardAddButton />}
        >
            <Card type="table"
            >
            
                <TableWithMessage
                 dataSource={dataSource} columns={columns}
                 loading={loading}
                 total={total}
                    expandedRowRender={info => {
                        //console.log(info);
                        return <TumorboardView tumorboard={info}/>;
                    }}
                />
            </Card>
        </PageHeaderLayout>
    </React.Fragment>);
}

 

export default TumorobardsList;
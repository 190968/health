import React from 'react';
import { Table, Input, Switch, Icon, Form, Card } from 'antd';
import {compose, withHandlers} from 'recompose';
import { withToggleModal, withDrawer } from '../../../../../../components/Modal';
import TaskAssignButton from '../../../../../../components/Tasks/components/TaskAssignButton';
import AvatarWithName from '../../../../../User/components/AvatarWithName';

const FormItem = Form.Item;
 
const columns = [{
    title: 'Name',
    dataIndex: 'user',
    key: 'name',
    render: user => <AvatarWithName user={user} />
  }, {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: role => role === 'careManage' ? 'Care Manager' : role
  },
//    {
//     title: 'Edit',
//     dataIndex: 'canEdit',
//     key: 'canEdit',
//     render: canEdit => <Switch defaultChecked={canEdit} />
//   }, {
//     title: 'Report',
//     dataIndex: 'canReport',
//     key: 'canReport',
//     render: canReport => <Switch defaultChecked={canReport} />
//   },
   {
    title: 'Approved',
    dataIndex: 'approved',
    key: 'approved',
     render: approved => approved ? <Icon type="check" /> : 'Pending'
  }];

const PlanTeamManager = props => {

    const {members=[], userPlan, loading} = props;
    const {user} = userPlan || {};
    const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };

      const extra = <TaskAssignButton patient={user}  attachments={[{type: 'up', object:userPlan}]} mode={'simple'}  asText={true} />
    return <Card type={'table'} title={'Members'} extra={extra}>
        <Table
        size={'middle'}
        //   components={components}
        //   rowClassName={() => 'editable-row'}
        //   bordered
            expandedRowRender={record => <div>
                <Switch defaultChecked={record.canReport} checkedChildren={'Can Report'} unCheckedChildren={'Cannot Report'} /> <Switch defaultChecked={record.canEdit} checkedChildren={'Can Edit'} unCheckedChildren={'Cannot Edit'} />
                </div>}
          dataSource={members}
          loading={loading}
          columns={columns}
          pagination={false}
        />
    </Card>
}

export default PlanTeamManager;


/***** */
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


const EditableCellPure = props => {
    //const { editing } = this.state;
    const editing = false;
    const {
    editable,
    dataIndex,
    title,
    record,
    index,
    handleSave,
    ...restProps
    } = props;
    return (
    <td ref={node => (this.cell = node)} {...restProps}>
        <EditableContext.Consumer>
            {(form) => {
            this.form = form;
            return (
                editing ? (
                <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                    rules: [{
                        required: true,
                        message: `${title} is required.`,
                    }],
                    initialValue: record[dataIndex],
                    })(
                    <Input
                        ref={node => (this.input = node)}
                        onPressEnter={props.save}
                    />
                    )}
                </FormItem>
                ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={props.toggleModal}
                >
                    {restProps.children}
                </div>
                )
            );
            }}
        </EditableContext.Consumer>
    </td>
    );
};

const enhance = compose(
    withToggleModal,
    withHandlers({
        save: props => () => {

        }
    }),
);
const EditableCell = enhance(EditableCellPure);
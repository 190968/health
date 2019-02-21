import React from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { withToggleModal } from '../../../../components/Modal';
import {compose, withHandlers} from 'recompose';

const dataSource = [{
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
  }, {
    key: '1',
    name: 'Edward King 1',
    age: '32',
    address: 'London, Park Lane no. 1',
  }];

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }];
const PlanTeam = props => {
    const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };

    return <React.Fragment>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
    </React.Fragment>
}

export default PlanTeam;


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
        {props.showModal ? (
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
        ) : restProps.children}
    </td>
    );
};

const enhance = compose(
    withToggleModal,
    withHandlers({
        save: props => () => {

        }
    })
);
const EditableCell = enhance(EditableCellPure);
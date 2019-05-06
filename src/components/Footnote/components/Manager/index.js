import React from 'react';
import { Icon, Input, Popover, Button, Form } from 'antd';
import '../../index.less';
import { compose, withHandlers } from 'recompose';
import { withToggleState } from '../../../Modal';
import { ColorSelect } from '../../../FormCustomFields/containers/ColorSelect';
const TextArea = Input.TextArea;

const FootnoteFieldPure = props => {
  const { footnote, form, onChange } = props || {};
  const { text, color } = footnote || {};
  const { getFieldDecorator } = form;
  return <>
    {getFieldDecorator('text', {
      initialValue: text,
      // rules: [{required: true, message: "Select Trial"}],
    }
    )(
      <TextArea placeholder={'Type footnote here...'}  autosize={{ minRows: 1, maxRows: 6 }} />
    )}
    <div style={{marginTop:5}}>
      {getFieldDecorator('color', {
        initialValue: color,
        // rules: [{required: true, message: "Select Trial"}],
      }
      )(
        <ColorSelect />
      )}
    </div>
    <div style={{ textAlign: 'right' }}>
      <Button type={'link'} size={'small'} onClick={onChange}>Close</Button>
    </div>

  </>
}
const enhanceForm = compose(
  Form.create(),
  withHandlers({
    onChange: props => () => {
      const { footnote, form } = props;
      console.log(props, 'props11111props');
      form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          props.onChange({...footnote, ...values});
          props.onHide();
        }
      });
    }
  })
)
const FootnoteField = enhanceForm(FootnoteFieldPure);
const FootnoteManager = props => {
  const { isToggled, toggleState, footnote, placement, onChange } = props;
  return <Popover
    overlayClassName={'footnote'}
    content={<FootnoteField footnote={footnote} onChange={onChange} onHide={toggleState} />}
    placement={placement}
    title="Add/Edit a Footnote"
    trigger="click"
    visible={isToggled}
  // onVisibleChange={toggleState}

  >
    <Icon type="bulb" onClick={toggleState} />
  </Popover>
}

const enhance = compose(
  withToggleState
);
export default enhance(FootnoteManager);
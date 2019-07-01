import React from 'react';
import { Icon, Input, Popover, Button, Form } from 'antd';
import '../../index.less';
import { compose, withStateHandlers } from 'recompose';
import { withToggleState } from '../../../Modal';
import { ColorSelect } from '../../../FormCustomFields/containers/ColorSelect';
const TextArea = Input.TextArea;

const FootnoteFieldPure = props => {
  const { footnote, changeText, changeColor} = props || {};
  const { text, color } = footnote || {};
  console.log(props);
  return <>
      <TextArea placeholder={'Type footnote here...'} value={text} onChange={changeText} autosize={{ minRows: 1, maxRows: 6 }} />
      <div style={{marginTop:5}}>
          <ColorSelect value={color} onChange={changeColor} />
      </div>
  </>
}
// const enhanceFormField = compose();
// export const FootnoteFormField = enhanceFormField(FootnoteFieldPure);

const enhanceForm = compose(
  withStateHandlers(props => {
    const {value} = props;
    return {
      footnote:value
    }
  }, {
    changeColor: (state, props) => (color) => {
      let { footnote } = state;
      footnote = {...footnote, color};
      props.onChange(footnote);
      return {footnote}
    },
    changeText: (state, props) => (e) => {
      let { footnote } = state;
      const text = e.target.value
      footnote = {...footnote, text};
      props.onChange(footnote);
      return {footnote}
    }
  })
)
export const FootnoteFormField = enhanceForm(FootnoteFieldPure);;

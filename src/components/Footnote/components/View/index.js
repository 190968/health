import React from 'react';
import { Button, Popover} from 'antd';
import '../../index.less';
import { IconCustom } from '../../../FitIcon';

export const FootnoteView = props => {
    const {footnote, placement} = props;
    const {text, color} = footnote || {};
    if (!footnote || text === '') {
      return null;
    }
    return <Popover overlayClassName={'footnote'} content={text} placement={placement} title="Footnote">
   <span style={{fontSize: '0.8em', verticalAlign: 'super'}}><IconCustom type={'asterisk'} color={color} style={{fontSize: '0.7em', verticalAlign:'top'}} /></span>
  </Popover>
}

export default FootnoteView;
import React from 'react';
import { Menu, Dropdown, Popover, Icon } from 'antd';
import { compose, withStateHandlers } from 'recompose';


const SettingsDropdownPure = props => {
    const {items=[], onClick, onVisibleChange, visible} = props;
     
    if (items.length === 0) {
        return null;
    } else if (items.length == 1) {
        // if we have only 1 item, show it with the icon
        const {icon, content} = items[0] || {};
        if (icon) {
            var contentWithIcon = React.cloneElement(
                content, 
                { icon }
            );
            return contentWithIcon;
        }
        //return items[0].content;
    }
    // const menu = (
    //     <Menu >
    //         {items.map(item => {
    //             const {key, content} = item;
    //             return <Menu.Item key={key}>
    //                 {content}
    //             </Menu.Item>;
    //         })}
    //     </Menu>
    //   );
    const menu = (
        <div >
            {items.map(item => {
                const {key, content, props={}} = item;
                return <div key={key}>
                    {content}
                </div>;
            })}
        </div>
      );
    return <Popover content={menu} trigger="click"  placement="bottomRight" getPopupContainer={triggerNode => triggerNode.parentNode} visible={visible} onVisibleChange={onVisibleChange}> <Icon type="setting" theme="outlined" /></Popover>

    return <Dropdown overlay={menu} getPopupContainer={triggerNode => triggerNode.parentNode}  /*onClick={onClick} *//*visible={visible} onVisibleChange={onVisibleChange}*/ /*trigger={['click']}*/>
    <Icon type="setting" theme="outlined" />
    </Dropdown>
}


const enhance = compose(withStateHandlers(props => {
    return {visible:false}
}, {
    onVisibleChange: props => (visible) => {
           return {
            visible
           }
    },
    onClick: props => (ee) => {
        //console.log(e);
        //const e = window.event;
        // e.preventDefault();
        // e.stopPropagation();
        return {
            visible:false
        }
 },
}));
const SettingsDropdown = enhance(SettingsDropdownPure);
export default SettingsDropdown;
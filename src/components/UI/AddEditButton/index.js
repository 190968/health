import React from 'react';
import {Button, Icon, Tooltip} from 'antd';

/**
 * Button can be text, icon, button
 */
export const AddEditButton = props => {
    const {icon, label, button=false, onClick, type, tooltip, size='small'} = props;

    // if (icon) {
    //     if (iconOnly) {
    //         button = <Icon type={icon} onClick={onClick} />
    //     } else {
    //         button = <Button size={'small'} icon={icon} onClick={onClick} />;
    //     }
    // }
    if (button) {
        return <Tooltip title={tooltip}><Button size={size} onClick={onClick} type={type} icon={icon}>{label}</Button></Tooltip>
    } else if (icon) {
        return <Tooltip title={tooltip || label}><Icon type={icon} onClick={onClick} /></Tooltip>;
    } else {
        return <Tooltip title={tooltip}><a className={'link'} onClick={onClick}>{label}</a></Tooltip>
    }
}
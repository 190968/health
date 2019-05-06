import React from 'react';
import {Icon} from 'antd';
import iconPaths from '../../assets/icons/selection';
import iconSet from '../../assets/icons/selection.json';
import  '../../assets/icons/style.css';

import IcomoonReact, {iconList} from 'icomoon-react'

function getPath(iconName) {
    const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);

    if (icon) {
        return icon.icon.paths.join(' ');
    } else {
        console.warn(`icon ${iconName} does not exist.`);
        return '';
    }
}


export const FitIcon = props => {
    const {type=''} = props;
    const {icon=type, width=17, height=17, align='baseline'} = props;
    // const styles = {
    //     svg: {
    //         display: 'inline-block',
    //         verticalAlign: 'middle',
    //     },
    //     // path: {
    //     //     fill: props.color,
    //     // },
    // };
    return <i className={"ico-"+icon} style={{verticalAlign:align}} />;
    // return <svg style={styles.svg} width={width} height={height} viewBox="0 0 1024 1024">
    //     <path d={getPath(icon)}></path>
    // </svg>
    //const className = 'fitango-moo'+type;
    // return <svg class={'icon '+type}><use xlink:href={'#'+type}></use></svg>;
    // return <i className={className} ></i>;
}



const IcoMoon = props => {
    const {type, onClick, style, color} = props;
    // console.log(props);
    let icon = <IcomoonReact iconSet={iconSet} color={color || "#444"} size={'1em'} icon={type} />;
    if (onClick) {
        return <span className={'anticon pointer'} style={{verticalAlign:'middle', ...style}} onClick={onClick}>{icon}</span>;
    }
    return icon;
}
export const IconCustom = props => {
    const {type, ...otherProps} = props;
    // console.log(props);
    const component = <IcoMoon type={type} {...otherProps} />;
    return component;
    return <Icon component={component} {...props} />
    // return <IcomoonReact iconSet={iconSet} color="#444" size={100} icon={type} />;
}

import React from 'react';
import './index.less';
import { compose, withHandlers } from 'recompose';
const colors = [
    '#7eb363',
    '#d77d4f',
    '#548db9',
    '#ca453a',
    '#8e5c9a',
    '#efc65d',
    '#a8a9ad'
]

const ColorItemPure = props => {
    const {color, value, onChange} = props;
    return <div onClick={onChange} className={'color-select-item '+(value === color ? 'selected' : '')} style={{backgroundColor:color}}></div>;
}
const enhance = withHandlers({
    onChange: props => () => {
        const {color} = props;
        console.log(color, 'colorfffffff');
        props.onChange(color);
    }
});
const ColorItem = enhance(ColorItemPure);
const ColorSelect = props => {
    const {value, onChange} = props;
    let colorsToUse = colors;
    if (!colors.includes(value)) {
        colorsToUse.push(value);
    }
    return <div className={'color-select'}>{colors.map(c=> <ColorItem key={c} color={c} value={value} onChange={onChange} />)}</div>;
}

export default ColorSelect;
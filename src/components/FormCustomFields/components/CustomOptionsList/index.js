
import React from 'react';
import {Button, Tooltip, Icon, Popconfirm} from 'antd'
import {compose, withHandlers, renderComponent, renderNothing, branch} from 'recompose';
import './index.less';

const enhance = compose(
    withHandlers({
        onChange: props => value => {
            const {i, updateOption} = props;
            if (updateOption) {
                updateOption(value, i);
            }
        }
    }),
);

const DeleteLinePure = props => {
    const {onClick} = props;
    return <Tooltip title="Remove Option" placement={'bottom'}>
    <Popconfirm title="Are you sure?" onConfirm={onClick} okText="Yes" >
    <Icon
            className="dynamic-delete-button"
            style={{marginLeft:5,  verticalAlign:'middle'}}
            type="minus-circle-o"
            // disabled={options.length <= minOptions}
        /> </Popconfirm></Tooltip>;
}
const DeleteLine = withHandlers({
    onClick: props => () => {
        const {value, index} = props;
        console.log(props,'props');
        props.onClick(value, index);
    }
})(DeleteLinePure);

const BlankComponent = props => {
    const {CustomComponent, minOptions=1, options, deleteOption, ...otherProps} = props;
    // const {value, index} = otherProps;
    return <div className={'custom-option-line'}>
            <div className={'option-component'}><CustomComponent {...otherProps} /></div>
            {/* {options.length > minOptions && <div className={'delete-line'}><DeleteLine onClick={deleteOption} /></div>} */}
            <div className={'delete-line'}><DeleteLine onClick={deleteOption} {...otherProps} /></div>
        </div>;
};
const CustomComponentEnhanced = enhance(BlankComponent);

const CustomOptionsList = (props) => {
    const {options=[], updateOption, remove, onChange, buttonLabel='Add an Option', ...otherProps} = props;
    return <>
        {options.length > 0 && <ul style={{listStyle: 'none',
            marginLeft: 0,
            marginBottom:0,
            paddingLeft: 0}}
        >
            {options.map((k, index) => (
                <CustomComponentEnhanced key={`item-${index}`} index={index} i={index} options={options} updateOption={updateOption} {...otherProps} value={k} />
            ))}
        </ul>}
        <span className={'link'} onClick={props.add}> {buttonLabel} </span>
        {/* <Button icon={'plus'} type="dashed" onClick={props.add} style={{width: '60%'}}> Add </Button> */}
    </>;
}

export default CustomOptionsList;

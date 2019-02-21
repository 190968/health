import React from 'react';
import {withHandlers} from 'recompose';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const vertStyle = {
    display: 'block',
    marginLeft: 0,
};


const CheckBoxGroup = props => {

    const { item,  handleChange} = props;
    const { items=[] } = item || {};
    const {activeFilters, code} = props;
    let activeFilter = activeFilters[code] || [];

    if (activeFilter.length === 0) {
        // select all of them
        activeFilter = items.map((option) => option.value);
    }

    const plainOptions = items.map((option) => {
        const coid = option.value;
        const name = option.label;
        return <Checkbox key={coid} value={coid} style={vertStyle} >{name}</Checkbox>;
    });

    return (<CheckboxGroup onChange={handleChange} value={activeFilter} >{plainOptions}</CheckboxGroup>)
}

export default withHandlers({
    handleChange: (props) => (value) => {
        const {code} = props;
        props.onSuccess(code, value);
    }
})(CheckBoxGroup);

// export default  class CheckBoxGroup extends React.PureComponent {

//     constructor(props){
//         super(props);
//         this.state = {checked: false};
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(value) {


//         console.log(value);

//         //const checked = e.target.checked ? 1 : 0;
//         const {code} = this.props;
//         // sending code(category) and value as key=>value, where value will be the key, and 1 (if checked) and 0 if not checked will be the value.
//         // before sending this filters to the server, we need to clean it a bit (only send the ones with 1 as value)
//         this.props.onSuccess(code, value);// in brackets to get the value of value_id instead of using "value_id" string as key

//     }


//     render() {

//     }
// }
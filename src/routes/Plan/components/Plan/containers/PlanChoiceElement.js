import { compose, withHandlers, withState, withProps } from 'recompose';
import { ChoiceElement } from '../../../../../components/FormCustomFields/components/ChoiceElement';
const enhance = compose(
	withState('value', 'setValue', (props) => {
        const {isMultiple=false, reports:reportsArr} = props;
        var reports = reportsArr || [];
        let value;
        //console.log(reports);
        if (isMultiple) {
            value = reports && reports.map(report => report.valueId);
            value = value && value[0];
            value = value || [];
            return value;
        } else {
            value = reports && reports.map(report => report.valueId);
            value = value && value[0];
            value = value && value[0];
            //console.log(value);
            //value = value && value[0] || '';
            //console.log(value);
            return value;
        }
    }),
    withProps(props => {
        const {isMultiple=false, item} = props;
        const {options=[]} = item;
        // console.log(props);
        // console.log(options);
        // if (isMultiple) {
        //     value = reports.map(report => report.optionId);
        //     value = value || [];
        //     return value;
        // } else {
        //     value = reports.map(report => report.optionId);
        //     value = value[0] || '';
        //     return value;
        // }
        return {options};
    }),
	withHandlers({
		onChange: (props) => (e) => {
			const { isMultiple, isDropdown, onChange } = props;
            let reports = [];
            let value = e;

			if (isMultiple) {
                //console.log(e);
				// create an array of multiple items
				reports = e;//{ value: e };//e.map((report) => ({ optionId: report }));
			} else if (isDropdown) {
				reports = e;//{ value: e };
			} else {
                value = e.target.value;
				reports = value;//{ value: value };
			}

            //console.log(reports);
           

            onChange(reports);
            props.setValue(value);
		}
	})
);

const PlanChoiceElement = enhance(ChoiceElement);
export default PlanChoiceElement;










// import React from 'react'

// import {Checkbox, Card} from 'antd';
// const CheckboxGroup = Checkbox.Group;


// const vertStyle = {
//     display: 'block',
//     /*height: '30px',*/
//     //lineHeight: '30px',
//     marginLeft: 0,
// };
// export default class PlanChecklist extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value:this.props.reports
//         };
//         this.onChange = this.onChange.bind(this);
//     };
//     static propTypes = {
//         //reportValue: PropTypes.array
//     };

//     static defaultProps = {
//         isPreview:false
//     }

//     componentWillReceiveProps(nextProps) {

//         if (nextProps.reports !== this.props.reports) {
//             this.setState({value:nextProps.reports});
//         }
//     }

//     onChange(value) {
//         if (this.props.isPreview || this.props.isBuilderMode) {
//             return true;
//         }
//         // checklist values
//         this.setState({value:value});
//         if (this.props.onChange) {
//             this.props.onChange(value, 'checklist');
//         } else if (this.props.handleReport) {
//             this.props.handleReport(value, 'checklist');
//         }


//     }

//     render() {

//         const {item, isBuilderMode, simple=false, disabled=false} = this.props;
//         const {value} = this.state;
//         //const {label} = item;


//         let radioStyle = {};
//         if (!simple && item.isVertical) {
//             radioStyle = vertStyle;
//         }
//         var options = item.options;
//         let plainOptions = [];
//         options.map((option) => {
//             const coid = option.value;
//             const name = option.label;

//             plainOptions.push(<Checkbox key={coid} value={coid} style={radioStyle} >{name}</Checkbox>);
//             return option;
//         });


//         return <CheckboxGroup value={value} onChange={this.onChange} disabled={disabled} >{plainOptions}</CheckboxGroup>
//     }
// }

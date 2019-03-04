import AssessmentChoicePure from '../components/AssessmentChoice';
import { compose, withHandlers, withState } from 'recompose';

const enhance = compose(
	withState('value', 'setValue', (props) => {
		const {isMultiple=false, reports} = props;
        //const {value} = this.state;
        let value;
        // console.log(reports);
        if (isMultiple) {

            value = reports.map(report => report.answerId);
            value = value || [];
            // if it's multiple, check use checkboxes
            return value;
        } else {
            value = reports.map(report => report.answerId);
            value = value[0] || '';
            return value;
        }
	}),
	withHandlers({
		onChange: (props) => (e) => {
			const { isMultiple, isDropdown, onChange,onChangeReport , answers} = props;
            let reports = [];
            let value = e;
            let currentValue = value;
			// console.log(props, 'choice');
			// console.log(e);

			if (isMultiple) {
				// create an array of multiple items
				reports = {answerId: e};
				// reports = {answerId : e.map((report) => report)};
			} else if (isDropdown) {
				reports =  { answerId: e } ;
			} else {
                value = e.target.value;
                currentValue = value;
                // find proper report
                //const obj = answers.find(a => a.idForReported === value);
                const obj = answers.find(a => a.id === value);
                // console.log(obj);   
                // console.log(currentValue);   
                value = obj.id;
				reports = { answerId: value };
			}

            //console.log(reports);
           

            onChange(currentValue);
            onChangeReport(reports);
            // console.log(value);
            props.setValue(currentValue);
		}
	})
);

const AssessmentChoice = enhance(AssessmentChoicePure);
export default AssessmentChoice;

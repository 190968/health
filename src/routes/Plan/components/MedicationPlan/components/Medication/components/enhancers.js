
import {compose, withState, withHandlers} from 'recompose';
export  const enhanceMedicationManagerActions = compose(
	withState('timesNum', 'setTimesNum', (props) => {
		const { medication } = props;
		const { timesPerHour = [] } = medication || {};
		return timesPerHour.length;
	}),
	withState('showAdvance', 'setShowAdvance', false),
	withHandlers({
		toggleAdvanced: (props) => () => {
			props.setShowAdvance(!props.showAdvance);
		},
		onSelectTimes: (props) => (value) => {
			props.setTimesNum(value);
		},
		onTotal: (props) => () => { }
	})
);
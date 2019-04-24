import CheckboxAsButtonPure from '../components/CheckboxAsButton';
import { compose, withStateHandlers } from 'recompose';
import { readMessageFiles } from 'react-intl-translations-manager';

const enhance = compose(
    withStateHandlers(props => {
        const {value} = props;
        return {
            value
        }
    }, {
        updateCheckboxes: (state, props) => (checkbox) => {
            const {value} = state;
            let checkmared = value;
            if (value.includes(checkbox)) {
                checkmared = value.filter(i => i !=checkbox );
            } else {
                checkmared = [...value, checkbox];
            }
            // console.log(checkbox);
            // console.log(value);
            // console.log(checkmared);
            // if have, then delete
            // othervise select
            if (props.onChange) {
                props.onChange(checkmared);
            }
            
            return {
                value:checkmared
            }
        }
    })
);
export const CheckboxAsButton = enhance(CheckboxAsButtonPure);

export const validateCheckboxAsButton  = (rule, value, callback) => {
    const {required, message} = rule;
    // console.log(required);
    // console.log(value);
    // console.log(value.length);
    if (required && value.length === 0) {
        callback(message);
        return;
    }
    // console.log(rule);
    // console.log(value);
    // if (value.number > 0) {
      callback();
    //   return;
    // }
    // callback('Price must greater than zero!');
  }
import ColorSelectPure from '../components/ColorSelect';
import {compose, withStateHandlers} from 'recompose';

const enhance = compose(
    withStateHandlers(props => {
        const {value} = props;
        return {value};
    }, {
        onChange: (state, props) => (value) => {
            // console.log(value, 'color');
            props.onChange(value);
            return {
                value
            }
        }
    })
);
export const ColorSelect = enhance(ColorSelectPure);
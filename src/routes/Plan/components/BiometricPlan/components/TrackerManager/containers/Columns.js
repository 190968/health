import Columns from '../components/Columns';
import { compose, withHandlers, withState } from 'recompose';

const enhance = compose(
    withState('columns', 'setColumns', props => {
        const {columns=[]} = props;
        console.log(props);
        return columns;
    }),
    withState('selectedColumns', 'setSelectedColumns', props => {
        const {value=[], columns} = props;
        // find key of the column
        return value.map(column => {
            return columns.findIndex(c => c.id===column.id);
        });
    }),
    withHandlers({
    onChange: props => (checkedValues) => {
        // console.log(props);
        const {columns=[]} = props;
        // console.log(checkedValues, 'checkedValues');
        props.onChange(checkedValues.map(checkedValue => {
            const column = columns[checkedValue] || {};
            const{id, name} = column || {};
            return {id, label:name};
        }));  
        props.setSelectedColumns(checkedValues);
    },
    appendColumn: props => (name) => {
        const {columns=[], selectedColumns=[]} = props;

        props.setColumns([...columns, {id:'', name}]);
        props.setSelectedColumns([...selectedColumns, columns.length]);
    }
}));
export const TrackerManagerColumns = enhance(Columns);
import {compose, branch, withProps} from 'recompose';
import {SortableElement} from 'react-sortable-hoc';



export const PlanElementBuilderEnhancer = compose(
    withProps(props => {
        const {i} = props;
        console.log(props);
        return {
            index:i,
            key: 'item-'+i
        }
    }),
    branch(props => props.isBuilderMode, SortableElement)
);

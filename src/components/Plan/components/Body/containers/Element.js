import Element from '../components/Element';
import {compose, branch} from 'recompose';
import {SortableElement} from 'react-sortable-hoc';
import { PlanElementBuilderEnhancer } from '../../Builder/containers/Element';

const enhance = compose(
    branch(props => props.isBuilderMode, PlanElementBuilderEnhancer)
);
export const PlanElement = enhance(Element);
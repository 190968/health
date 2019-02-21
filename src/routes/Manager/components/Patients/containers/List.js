import List from '../components/List';
import {compose, branch, renderComponent} from 'recompose';
import { withPatientsQuery, withPatientsSimpleQuery } from '../queries';

const enhance = compose(
    branch(props => props.simple, withPatientsSimpleQuery, withPatientsQuery)
    // branch(props => props.simple, renderComponent(withPatientsSimpleQuery), withPatientsQuery)
);
export const PatientsList = enhance(List);
import React from 'react';
import { compose, branch, renderComponent} from 'recompose';
import TreatmentBlockOptionElementEditor  from './containers/TreatmentBlockOptionElementEditor';
import ChemotherapyElementEditor  from './containers/TreatmentChemotherapyElementEditor';

const enhance = compose(
    branch(props => props.type === 'chemotherapy', renderComponent(ChemotherapyElementEditor))
);
export default enhance(TreatmentBlockOptionElementEditor);
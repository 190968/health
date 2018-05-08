import React from 'react';
import {compose, branch, renderComponent, withProps, withState} from 'recompose';

import TumorBoardEditor from '../components/TumorBoardEditor';
import TumorBoardBodyBuilder from './TumorBoardBodyBuilder';
import TumorBoardPublish from './TumorboardPublish';


const enhance = compose(

    branch(props => props.step === 1, renderComponent(TumorBoardBodyBuilder)),
    branch(props => props.step === 2, renderComponent(TumorBoardPublish))
);

export default enhance(TumorBoardEditor);
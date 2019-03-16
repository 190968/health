import AssessmentElementBuilder from '../components/AssessmentElementBuilder';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {injectIntl} from 'react-intl';
import {Form} from 'antd';

export default AssessmentElementBuilder;



export const preparePlanElementAssessmentInput = (values) => {
    const {assessmentId} = values;

    return assessmentId
}


import React from 'react';
import View from '../components/View';
import {compose, withProps} from 'recompose';
import { withDrawer, withSpinnerWhileLoading } from '../../../../../components/Modal';
import { FormattedMessage } from 'react-intl';
import messages from '../i18n/en';
import { TaskInfoFragment } from '../fragments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../User/fragments';

export const GET_TASK_QUERY = gql`    
query GET_TASK ($id: UID!) {
    management {
        getTask (id:$id) {
            ...TaskInfo
            getHistory {
                edges {
                    id
                    user {
                        ...UserInfo
                    }
                    date
                    action
                }
            }
        }
    }
  }
  ${TaskInfoFragment}
  ${UserInfoFragment}
`;

// 1- add queries:
const withQuery = graphql(
    GET_TASK_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                variables: {
                    id: ownProps.task.id,
                },
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {management, loading} = data;
            const {getTask} = management || {};
            return {
                task: getTask,
                loading
            }
        },
    }
); 

const enhance = compose(
    withProps(props => {
        const {task} = props;
        const {title} = task || {};
        //const title = <FormattedMessage {...messages.viewTask} />;
        return {modalTitle:title}
    }),
    withDrawer,
    withQuery,
    withSpinnerWhileLoading
);
export const TaskView = enhance(View);
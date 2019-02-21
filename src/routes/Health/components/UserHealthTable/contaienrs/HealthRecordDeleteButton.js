import HealthRecordDeleteButtonPure from '../components/HealthRecordDeleteButton';
import { compose, withHandlers } from 'recompose';
import {notification} from 'antd';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const HEALTH_RECORD_DELETE_MUTATION = gql`
    mutation deleteHealthRecord($id:UID!) {
        deleteHealthRecord(id:$id) 
    }
`;

const withMutation = graphql(HEALTH_RECORD_DELETE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteRecord: () => {
            const {record} = ownProps;
            return mutate({
                variables:  {
                    id: record.id
                },
                // reload a list of health records
            })
        },
    }),
});

const enhance = compose(
    withMutation,
    withHandlers({
        handleDelete: props => () => {
            //console.log(111);

            props.deleteRecord().then(() => {
                notification['success']({
                    message: 'Deleted',
                    description: 'Health Record has been successfully deleted',
                  });
                props.onDelete();
            });
        }
    })
);
export const HealthRecordDeleteButton = enhance(HealthRecordDeleteButtonPure);

export default HealthRecordDeleteButton;
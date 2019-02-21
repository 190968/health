import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Popconfirm, Icon } from 'antd';
import { withDeleteCohortUserMutation } from '../../../../mutations';
import {compose, withHandlers} from 'recompose';

const CohortDeleteUserButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
    {props.asMenuItem ? <span>Delete</span> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}


const enhance = compose(
	withDeleteCohortUserMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteCohortUser().then(() => {
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const CohortDeleteUserButton = enhance(CohortDeleteUserButtonPure);
export default CohortDeleteUserButton;
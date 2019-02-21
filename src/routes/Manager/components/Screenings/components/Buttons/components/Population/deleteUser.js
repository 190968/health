import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Popconfirm, Icon } from 'antd';
import { withDeleteScreeningUserMutation } from '../../../../mutations';
import {compose, withHandlers} from 'recompose';

const ScreeningPopulationDeleteUserButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
    {props.asMenuItem ? <span>Delete</span> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}


const enhance = compose(
	withDeleteScreeningUserMutation,
	withHandlers({
		handleDelete: (props) => () => {
			props.deleteScreeningUser().then(() => {
                if (props.refetch) {
                    props.refetch();
                }
            });
		}
	})
);

export const ScreeningPopulationDeleteUserButton = enhance(ScreeningPopulationDeleteUserButtonPure);
export default ScreeningPopulationDeleteUserButton;
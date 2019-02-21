import React from 'react';
import View from '../components/View';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../../../../../components/Modal';
import { withNetworkProgramQuery } from '../queries';
import { Avatar } from 'antd';



const enhance = compose(
    withNetworkProgramQuery,
    withProps(props => {
        const {program} = props;
        const {name, icon} = program || {};
        return {
            modalWidth:800,
            modalTitle: <React.Fragment><Avatar src={icon} /> {name}</React.Fragment>
        }
    }),
    withDrawer
);
export const ProgramView = enhance(View);
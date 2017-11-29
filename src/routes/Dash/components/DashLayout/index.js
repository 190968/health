import React from 'react';
import UserDash from '../../components/DashUserLayout'
import ReactPlaceholder from 'react-placeholder';
export const DashLayout = ({ current_role, loading }) => (
    <ReactPlaceholder showLoadingAnimation type='media' rows={4} ready={!loading}>
        {current_role == 'user' && <UserDash/>}
    </ReactPlaceholder>
)

export default DashLayout
import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { Box, BoxHeader, BoxHeaderSettings, BoxBody } from '../../../../components/Box';
import { NavLink } from 'react-router-dom';
import UserDash from '../../containers/DashUser'
import ReactPlaceholder from 'react-placeholder';
export const DashLayout = ({ current_role, loading }) => (
    <ReactPlaceholder showLoadingAnimation type='media' rows={4} ready={!loading}>
        {current_role == 'user' && <UserDash />}
    </ReactPlaceholder>

)

export default DashLayout
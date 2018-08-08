import React from 'react'
import { Link } from 'react-router-dom';
import { withCurrentNetwork } from '../../../../../queries/network';



const LogoPure = props => {
    return <Link to={'/'}><img alt="" className="logo" style={{height:'50px', marginRight:'5px'}} src={props.currentNetwork.logo} /></Link>
}
 
export const NetworkLogo = withCurrentNetwork(LogoPure);
export default  NetworkLogo;
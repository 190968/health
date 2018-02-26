import React from 'react'
import {Avatar} from 'antd';


export default class UserWidget extends React.PureComponent {
    static defaultProps = {
        onlyFirst: false
    }
    render() {

        const {user, onlyFirst} = this.props;
        const {firstName, fullName} = user;

        const name = onlyFirst ? firstName : fullName;

        return (
            <span><Avatar size="small" style={{ verticalAlign: 'middle' }}>{name}</Avatar> <span>{name}!</span></span>
        );
    }
}

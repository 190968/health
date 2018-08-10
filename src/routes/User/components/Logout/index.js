import React from 'react';
import { Redirect} from 'react-router-dom'

class NormalLogoutForm extends React.Component{

    componentWillMount() {
        //this.props.mutate();
    }

    render(){
        console.log(this.props);
        const {currentUser={}} = this.props;
        const {token} = currentUser;
        // const token = this.props.token;
        // if (!token) {
        //     //return <div>Redirect to dash</div>;
        //     return <Redirect to={{
        //         pathname: '/'
        //     }} />
        // }
        this.props.logout();

        /*
        this.props.mutate().then((data) => {
            if (!data.loading) {

                this.props.logout();

                return(
                    <Redirect to={{pathname: '/'}} />
                )
            }
        })*/


      //return ('')
        return null;
        return(
            <Redirect to={{pathname: '/'}} />
        )

    }
}
export default NormalLogoutForm;
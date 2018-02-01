import React,{PropTypes} from 'react';
import { Redirect} from 'react-router-dom'

class NormalLogoutForm extends React.Component{

    componentWillMount() {
        //this.props.mutate();
    }

    render(){
        this.props.logout();

        /*
        this.props.mutate().then((data) => {
            if (!data.loading) {
                console.log(data);
                this.props.logout();

                return(
                    <Redirect to={{pathname: '/'}} />
                )
            }
        })*/

       // console.log( );
       return ('')

        return(
            <Redirect to={{pathname: '/'}} />
        )

    }
}
export default NormalLogoutForm;
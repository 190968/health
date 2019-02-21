import React from 'react'
import {Link, Switch} from 'react-router-dom'
import {Route} from 'react-router'
import PrivateRoute from '../routes/privateRoute';


import {
    asyncDash,
    asyncPlan,
    asyncLogin,
    asyncRegister,
    asyncLogout,
    asyncSettings,
    asyncRepository,
    asyncForgotPassword,
    asyncCalendar,
    asyncMessages,
    asyncStatic,
} from '../routes';

const NoMatch = ({ location }) => (
    <center>
        <h1>
            404. Page not found

        </h1>
        <Link to="/">Go to main page</Link>
    </center>
);

export const BasicRoutes = ({store}) => {
    return (
        <React.Fragment>
            <PrivateRoute exact path="/" component={asyncDash()}/>
            <Route exact path="/login" component={asyncLogin()}/>
            <Route exact path="/logout" component={asyncLogout()}/>
            <Route exact path="/register/:code?" component={asyncRegister()}/>
            <Route exact path="/password/reset" component={asyncForgotPassword()}/>
            <PrivateRoute path="/settings" component={asyncSettings()}/>
            {/*<PrivateRoute path="/repository" component={asyncRepository(store)}/>*/}
            <PrivateRoute path="/messages" component={asyncMessages()}/>
            <PrivateRoute path="/calendar" component={asyncCalendar()}/>
            <PrivateRoute path="/plan/:upid" component={asyncPlan()}/>
            <PrivateRoute path="/static" component={asyncStatic()}/>
            {/* <Route  component={asyncCalendar(store)}/> */}
        </React.Fragment>
    )
}

export const  UseRoutes = (props) => {
    const {routes=[], ...otherProps} = props;
    // console.log(otherProps, 'otherProps');
    return <Switch>{routes.map((route, i) => <RouteWithSubRoutes key={i}  {...otherProps} {...route} />)}</Switch>;
}

const RouteWithSubRoutes = route => {
    const {path, component, exact=false, isPublic=false, ...otherProps} = route;
    console.log(route);
    if (!isPublic) {
        return <PrivateRoute path={path} 
        exact={exact}
        component={component} />
    } else {
    return <Route path={path} 
        exact={exact}
        component={component}
        // render={props => (
        //     // pass the sub-routes down to keep nesting
        //     <component {...props} {...otherProps} routes={route.routes} />
        // )}
    />
    }
}

export const CoreNotAuthorizedRoutesWithProps = props => {

    return [
        {
            path: "/login",
            component: <asyncLogin />,
            exact:true,
            isPublic:true,
        },
        {
            path: "/logout",
            component: asyncLogout(),
            exact:true,
            isPublic:true
        },
        {
            path: "/register/:code?",
            component: asyncRegister(),
            exact:true,
            isPublic:true
        },
        {
            path: "/password/reset",
            component: asyncForgotPassword(),
            exact:true,
            isPublic:true
        },
         
        
      ];
}
export const CoreNotAuthorizedRoutes = [
    {
        path: "/login",
        component: asyncLogin(),
        exact:true,
        isPublic:true,
    },
    {
        path: "/logout",
        component: asyncLogout(),
        exact:true,
        isPublic:true
    },
    {
        path: "/register/:code?",
        component: asyncRegister(),
        exact:true,
        isPublic:true
    },
    {
        path: "/password/reset",
        component: asyncForgotPassword(),
        exact:true,
        isPublic:true
    },
  ];

export const CoreRoutes = [
    {
      path: "/",
      component: asyncDash(),
      exact:true,
    },
    ...CoreNotAuthorizedRoutes,
    {
        path: "/settings",
        component: asyncSettings(),
    },
    {
        path: "/messages",
        component: asyncMessages(),
    },
    {
        path: "/calendar",
        component: asyncCalendar(),
    },
    {
        path: "/static",
        component: asyncStatic(),
    },
    {
        path: "/plan/:upid",
        component: asyncPlan(),
    }
    
  ];

  export const CoreRoutesEnd = [
  {
    path: false,
    component: asyncLogin(),
    isPublic:true
    }
  ]

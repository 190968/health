import React from 'react';
import { withState } from 'recompose';
// adding router
import { BrowserRouter } from 'react-router-dom'

import apolloClient from '../../clients/apolloClient';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import gql from 'graphql-tag';
import Core from '../../layouts';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import es from 'react-intl/locale-data/es';
import localeData from '../../locales/translations';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/ru';
import 'moment/locale/es';

/**
 * Creating a browser history
 */
import { createBrowserHistory } from 'history'
// locale
import { LocaleProvider, Spin, Icon } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import esEs from 'antd/lib/locale-provider/es_ES';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import { withCurrentUserAndNetwork } from '../../queries/user';
import { withSpinnerWhileLoading } from '../Modal';


//moment.locale('ru');
// Adding Locale data
const antdLocales = { "ru": ruRU, "en": enUS, "es": esEs };
addLocaleData([en, ...ru, ...es]);
var history = createBrowserHistory();

/**
 * Preparing query to grab the main info
 */
export const NETWORK_INFO_QUERY = gql`
    query NETWORK_INFO {
        network {
            id,
            name,
            description,
            logo,
            modules {
                id,
                name,
                placeholder
            }
            allowSignUp
            colors {
                primary
                brand
                headerBg
                headerText
                footerBg
                footerText
            }
            labels {
                key
                label
            }
        },
       
    }
`;

// const queryOptions = {
//     query: NETWORK_INFO_QUERY,
//     fetchPolicy: 'cache-first'
// }



const App = props => {

    // load network and token info
    // componentWillMount() {
    //     //this.setState({loading:true})
    //     apolloClient.query(queryOptions)
    //         .then(({data: {network, account: {user, currentToken}}}) => {
    //         //this.setState({loading:false})
    //         let {token, isExpired} = currentToken;
    //         if (isExpired) {
    //             token = '';
    //         }
    //         localStorage.setItem('token', token);
    //             if (token) {
    //                 this.props.store.dispatch(loadUser(user));


    //             } else {
    //                 this.props.store.dispatch(loadUserFAIL(user));
    //             }
    //             this.props.store.dispatch(loadNetwork(network));
    //         })
    // }

    // shouldComponentUpdate() {
    //     return false
    // }


    return (
        <ApolloProvider client={apolloClient}>
            <AppInner {...props} />
        </ApolloProvider>
    );
}

export default App;

const AppInnerPure = props => {
    const { language, loading } = props;// "ru";

    if (loading) {
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    top: '50%',
                    position: 'absolute',
                    minHeight: '100vh',
                    flexDirection: 'column'
                }}
            >
                <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            </div>
        );
    }

    const messages = localeData[language] || localeData.en;
    const antdLocale = antdLocales[language] || antdLocales.en;

    // console.log(antdLocale);
    const basename = "/static/myapp";
    return <LocaleProvider locale={antdLocale}>
        <IntlProvider locale={language} messages={messages}>
            <Provider store={props.store}>

                <BrowserRouter history={history} basename={basename}>
                    <Core {...props} store={props.store} initialLoad />
                </BrowserRouter>

            </Provider>
        </IntlProvider></LocaleProvider>;
}

const AppInner = withCurrentUserAndNetwork(withSpinnerWhileLoading(withState('language', 'setLanguage', props => {
    const { currentUser } = props;
    const { localeSimple: locale = 'en' } = currentUser || {};
    console.log(locale);
    return locale;
})(AppInnerPure)));
import { Provider, useSelector } from 'react-redux';
import { Route } from 'react-router';
import store from './redux';
import Categories from './pages/Categories/Categories';
import Main from './pages/Main/Main';
import { history } from './redux/reducers';
import { IntlProvider } from 'react-intl';
import { messages } from './i18n';
import { StateInterface } from './interfaces/StateInterface';
import { Redirect } from 'react-router';
import { Router } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

function App() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const locale = data.photo.locale;
  return (
    <Provider store={store}>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
        <ConnectedRouter history={history} />
        <Router history={history}>
          <Route path="/:categories" component={Categories} />
          <Route path="/" component={Main} exact />
          <Route render={() => <Redirect to="/" />} />
        </Router>
      </IntlProvider>
    </Provider>
  );
}

export default App;

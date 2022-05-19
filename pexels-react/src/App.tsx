import { ConnectedRouter } from 'connected-react-router';
import { Provider, useSelector } from 'react-redux';
import { Router, Route } from 'react-router';
import store from './redux';
import Categories from './pages/Categories/Categories';
import Main from './pages/Main/Main';
import { history } from './redux/reducers';
import { IntlProvider } from 'react-intl'
import { messages } from './i18n';
import { StateInterface } from './interfaces/StateInterface';

function App() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const locale = data.photo.locale
  return (   
    <Provider store={store}>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale='en'>
        <ConnectedRouter history={history} />
        <Router history={history}>
          <Route path="/categories" component={Categories}/>
          <Route path="/" component={Main} exact/>      
        </Router>
      </IntlProvider>
    </Provider>    
  );
}

export default App;

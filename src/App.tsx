import { HashRouter, useRoutes } from 'react-router-dom';

import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';

function AppRoutes() {
  const routing = useRoutes(Router);
  return <ScrollToTop>{routing}</ScrollToTop>;
}

function App() {

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );

}

export default App;
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppNavigate';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
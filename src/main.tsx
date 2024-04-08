import App from './App';
import ReactDOM from 'react-dom/client';
import { AppProvider } from'./appContext';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <AppProvider>
    <App />
  </AppProvider>
)
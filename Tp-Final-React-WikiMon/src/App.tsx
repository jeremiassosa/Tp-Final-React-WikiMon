import Settings from './pages/Settings';
import { ThemeProvider } from './context/SettingsContext';

function App() {
  return (
    <ThemeProvider>
      <Settings />
    </ThemeProvider>
  )
}

export default App




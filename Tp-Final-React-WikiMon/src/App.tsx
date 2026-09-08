import { Settings } from './pages/Settings';

import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Settings />
    </SettingsProvider>
  )
}

export default App




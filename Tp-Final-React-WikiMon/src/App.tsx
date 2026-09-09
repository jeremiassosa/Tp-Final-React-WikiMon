import {SettingsProvider} from './context/SettingsContext';
import {Settings} from './pages/Settings';



function App() {
  return (
    <>
  
      <SettingsProvider>
      <Settings/>
      </SettingsProvider>
    </>
  )
}

export default App



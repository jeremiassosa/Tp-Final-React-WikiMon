import { useSettings } from '../context/SettingsContext' 

export function Settings() {
  const { Logout, ChangeTheme } = useSettings()

  return (
    <div>
      <button onClick={ChangeTheme}>Cambiar Tema</button>
      <button onClick={Logout}> Cerrar Sesión</button>
    </div>
  )
}



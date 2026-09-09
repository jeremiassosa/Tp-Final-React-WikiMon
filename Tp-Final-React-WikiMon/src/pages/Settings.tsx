import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext'
import '../styles/Settings.css'
import { useNavigate } from 'react-router-dom';


export function Settings() {

    useEffect(() => {

    const Theme = localStorage.getItem('theme')

    if (Theme) {
      document.body.classList.add('blackMode')
      document.body.classList.remove('whiteMode')
    }
    else {
      document.body.classList.add('whiteMode')
      document.body.classList.remove('blackMode')
    }
  }, [])
    
  const { Logout, ChangeTheme } = useSettings()
    const navigate = useNavigate();
  

  return (
    <div className='center'>
      <button onClick={()=>navigate(-1)}>GO BACK</button>
      <div className="buttons">
        <p>Click here to change your page's theme.</p>
        <button
          className="change-theme-button"
          onClick={ChangeTheme}>Change Theme</button>
        <p>Click here to log out.</p>
        <button
          className="logout-button"
          onClick={Logout}>Logout</button>
      </div>
    </div>
  )
}



import { useTheme } from "../context/SettingsContext";
import '../styles/Settings.css'


function Settings() {

    const { Theme, ChangeTheme } = useTheme()

    return (
        <div>
            <section className={Theme ? "blackMode" : "whiteMode"}>
                <p>The Theme now is {Theme ? "Oscuro" : "Claro"}</p>

                <button
                    type="button"
                    className="counter addition"
                    onClick={ChangeTheme}
                >
                    Change Theme
                </button>
            </section>


        </div>

    );
}

export default Settings;
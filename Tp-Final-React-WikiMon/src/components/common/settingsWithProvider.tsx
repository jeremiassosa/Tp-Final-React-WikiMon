import { SettingsProvider } from "../../context/SettingsContext";
import { Settings } from "../../pages/Settings";

function SettingsWithProvider(){
    return(
        <>
        <SettingsProvider>
            <Settings></Settings>
        </SettingsProvider>

        </>
    )
}

export default SettingsWithProvider
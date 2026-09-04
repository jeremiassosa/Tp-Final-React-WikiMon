import { useLoginForm } from "../store/AuthStore";
import "../styles/Login.css"

function Login() {

    const name = useLoginForm((state) => state.name)
    const password = useLoginForm((state) => state.password)

    const setNameInput = useLoginForm((state) => state.setNameInput)
    const setPasswordInput = useLoginForm((state) => state.setPasswordInput)


    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    }
    return (
        <div className="login">
            <form onSubmit={onSubmit}>
                <h1 className="tittle">WikiMon</h1>
                <input
                    className="input-name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <input
                    className="input-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button className="btn-get-into" type="submit">
                    Get Into
                </button>
            </form>

        </div>
    )
}


export default Login;
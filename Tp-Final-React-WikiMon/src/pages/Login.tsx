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
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <input
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
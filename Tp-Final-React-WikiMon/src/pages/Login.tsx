import { useLoginForm } from "../store/AuthStore";

function Login() {

    const name = useLoginForm((state) => state.name)
    const password = useLoginForm((state) => state.password)

    const setNameInput = useLoginForm((state) => state.setNameInput)
    const setPasswordInput = useLoginForm((state) => state.setPasswordInput)


    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    }
    return (
        <div>
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
                <button type="submit">Get Into</button>
            </form>
            <div>
                <span>USER {name}</span>
                <span>PASSWORD: {password}</span>
            </div>
        </div>
    )
}


export default Login;
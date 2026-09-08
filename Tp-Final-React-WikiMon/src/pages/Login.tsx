import { useLoginForm } from "../store/AuthStore";
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom'; 


function Login() {

    const email = useLoginForm((state) => state.email)
    const password = useLoginForm((state) => state.password)

    const setEmailInput = useLoginForm((state) => state.setEmailInput)
    const setPasswordInput = useLoginForm((state) => state.setPasswordInput)
    const navigate = useNavigate();





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
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <input
                    className="input-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button className="btn-get-into" type="submit" onClick={()=> (navigate(`/HomePage`))}>
                    Get Into
                </button>
            </form>

        </div>
    )
}


export default Login;
import { useLoginForm } from "../store/AuthStore";
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom'; 


function Login() {
    document.body.classList.add('whiteMode')
    document.body.classList.remove('blackMode')
    const email = useLoginForm((state) => state.email)
    const password = useLoginForm((state) => state.password)
    const error = useLoginForm((state) => state.error) 

    const setEmailInput = useLoginForm((state) => state.setEmailInput)
    const setPasswordInput = useLoginForm((state) => state.setPasswordInput)
    const loginSubmit = useLoginForm((state) => state.loginSubmit) 
    const navigate = useNavigate();

    const checkIn = (e: React.FormEvent) => {
        e.preventDefault();
        const success = loginSubmit(); 
        
        if (success) {
            console.log("Logged in successfully!");
            navigate(`/HomePage`)
        }
    }

    return (
        <div className="login">
            <form onSubmit={checkIn}>
                <h1 className="tittle">WikiMon</h1>
            
                
                {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
                <button className="btn-get-into" type="submit" onClick={()=> checkIn()}>
                    Get Into
                </button>
            </form>
        </div>
    )
}

export default Login;

import { useState, useEffect } from "react";
import { createSession } from "../../services/service";
import "./Login.css";
import { checkSession } from "../../services/service";
import { useHistory } from "react-router-dom";
import ErrorMessages from "../Error/ErrorMessages";

const Login = function ({ props }) {
    const [username, setUsername] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [error, setError] = useState("");
    const history = useHistory();

    const onChange = (e) => {
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };
    useEffect(() => {
        checkSession()
            .then((obj) => {
                props.makeStatusLoggedIn(true);
            })
            .catch((error) => {
                props.makeStatusLoggedIn(false);
            });
    }, []);

    const login = () => {
        createSession({ username })
            .then((userinfo) => {
                const uid = userinfo.uid;
                props.onLogin({ username, uid: userinfo.uid });
                history.push(`/`);
                setError("");
            })
            .catch((err) => {
                setError(ErrorMessages[err.error]);
                console.log("error this side");
            });
    };

    return (
        <div className="login-ui">
            <div className="login-container">
                <div className="login-component">
                    <h1>Login</h1>
                    <div>
                        <label>
                            UserName:
                            <input
                                className="user-login-name"
                                onChange={onChange}
                                value={username}
                            ></input>
                        </label>
                    </div>
                    <div className="error-message">{error}</div>
                    <div className="login-button">
                        <button
                            className="login"
                            onClick={login}
                            disabled={isDisabled}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;

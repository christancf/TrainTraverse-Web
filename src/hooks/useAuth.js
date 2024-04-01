import { useAtom } from "jotai";
import { loginStateAtom } from "../state/loginState";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

function useAuth(nav) {
    const [loginState, setLoginState] = useAtom(loginStateAtom);
    const navigate = useNavigate();

    const checkLoggedIn = () => {
        try {
            if(loginState.loggedIn) {
                return loginState;
            }
            
            const token = sessionStorage.getItem("access_token");
            
            console.log(token, "Dffadfdfa");

            if(!token) {
                if(nav) navigate("/signin")
                return loginState;
            }

            let state = parseJwt(token)
            let newTokenState = { ...loginState, loggedIn: true, role: state.role, username: state.sub };
            setLoginState(newTokenState);

            return newTokenState;
        } catch (e) {
            console.error(e);
            if(nav) navigate("/signin")
        }

        return loginState;
    }

    return checkLoggedIn()
}


export default useAuth;

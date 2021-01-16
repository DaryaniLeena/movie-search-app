import { useHistory } from "react-router-dom";

function Logout({ props }) {
    const history = useHistory();
    const logoutuser = function () {
        props.performLogout();
        history.push(`/`);
    };
    return <div>{logoutuser()}</div>;
}
export default Logout;

import { useRouteError } from "react-router-dom";
import Home from "./Home";

export default function Error() {

    const error = useRouteError();
    console.log(error);

    return (

        <>
        <div>
            <h1>Oh noes! Page not found.</h1>
            <p>{error.data}</p>
        </div>

        </>
    );
        
}
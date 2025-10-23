import { useRouteError } from "react-router-dom";
import "./error.css";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="content">
      <h1>ERROR:{error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </div>
  );
};

export default Error;

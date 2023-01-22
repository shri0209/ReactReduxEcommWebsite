import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function loggedIn() {
    localStorage.setItem("log1", false);
    navigate("/");
  }

  useEffect(() => {
    let login = localStorage.getItem("log1");
    if (login) {
      navigate("/");
    }
  });

  return (
    <div className="form-group shadow-lg p-3 m-5 rounded">
      <h1>Login Page</h1>
      <label for="formGroupExampleInput">Username</label>
      <input
        type="text"
        className="sr-only m-2"
        id="formGroupExampleInput"
        placeholder="Enter Username"
      />
      <br />
      <br />
      <label for="formGroupExampleInput">Password</label>
      <input
        type="password"
        className="sr-only m-2"
        id="formGroupExampleInput"
        placeholder="Enter Password"
      />
      <br />
      <br />
      <button onClick={loggedIn}>Login</button>
      <br />
    </div>
  );
}

export default Login;

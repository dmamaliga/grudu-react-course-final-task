import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "email-validator";
import styles from "./Auth.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = () => validator.validate(email);
  const validatePassword = () => password.length >= 8 && password.length <= 256;

  const isFormValid = validateEmail() && validatePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:3001/users/${password}`
      );
      if (response.data.email === email) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/tweets");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${
                !validateEmail() && touched.email ? styles.inputError : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            {!validateEmail() && touched.email && (
              <p className={styles.errorText}>Invalid email</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`${styles.input} ${
                !validatePassword() && touched.password ? styles.inputError : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            />
            {!validatePassword() && touched.password && (
              <p className={styles.errorText}>Invalid password (8–256 chars)</p>
            )}
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid}
            className={styles.button}
          >
            Login
          </button>
          <p className={styles.bottomText}>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

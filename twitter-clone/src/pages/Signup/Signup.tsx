import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "email-validator";
import styles from "../Login/Auth.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    fullName: false,
    password: false,
  });

  const validateEmail = () => validator.validate(email);
  const validatePassword = () => password.length >= 8 && password.length <= 256;
  const validateFullName = () => fullName.length >= 1 && fullName.length <= 512;

  const isFormValid =
    validateEmail() && validatePassword() && validateFullName();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const newUser = {
        id: password,
        name: fullName,
        email,
      };

      const response = await axios.post("http://localhost:3001/users", newUser);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(newUser));
        navigate("/tweets");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className={`${styles.input} ${
              !validateFullName() && touched.fullName ? styles.inputError : ""
            }`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            required
          />
          {!validateFullName() && touched.fullName && (
            <p className={styles.errorText}>Invalid full name</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className={`${styles.input} ${
              !validateEmail() && touched.email ? styles.inputError : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            required
          />
          {!validateEmail() && touched.email && (
            <p className={styles.errorText}>Invalid email</p>
          )}

          <input
            type="password"
            placeholder="Password (8+ chars)"
            className={`${styles.input} ${
              !validatePassword() && touched.password ? styles.inputError : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            required
          />
          {!validatePassword() && touched.password && (
            <p className={styles.errorText}>Invalid password</p>
          )}

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid}
            className={styles.button}
          >
            Sign up
          </button>
          <p className={styles.bottomText}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import styles from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  name: string;
}

export default function TopBar({ name }: TopBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.username}>Hello, {name}</span>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

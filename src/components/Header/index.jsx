import Navbar from "react-bootstrap/Navbar";
import { HiChevronLeft } from "react-icons/hi"
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

function Header({ message, linkBack }) {
  let navigate = useNavigate()

  function backPage() {
    navigate(linkBack)
  }

  return (
    <nav className={`${styles.height}  `}>
      <div className="main">
        <div>
          <button onClick={backPage} className={`${styles.buttonBack}`}><i><HiChevronLeft/></i></button>
        </div>
        <div className={`${styles.title}`} >
          <h2 className="text-light">{message}</h2>
          <p>NutriHut</p> {/* Elemento HTML para exibir o nome da empresa */}
        </div>
      </div>
    </nav>
  );
}

export default Header;

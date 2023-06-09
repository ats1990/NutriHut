import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import styles from "./index.module.css";
function Footer() {
  return (
    <>
      <div className={`${styles.footer}`}>
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                {<BsFacebook size="1.5em" />}
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                {<BsInstagram size="1.5em" />}
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                {<BsLinkedin size="1.5em" />}
              </a>
            </li>
          </ul>
          <p className="text-center text-muted">NutriHut © 2023</p>
        </footer>
      </div>
    </>
  );
}

export default Footer;

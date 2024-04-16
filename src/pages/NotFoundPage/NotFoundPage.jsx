import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <p className={css.notFoundText}>
        <span className={css.notFoundAccent}>Sorry,</span>
        the page you visited does not exist
      </p>
      <Link className={css.backHome} to="/">
        ← Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;

import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMapMarker, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../style/footer.css";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="container px-4 py-5">
          <div className="row g-4">
            <div className="col-md-4">
              <h3 className="fw-bold fs-4 mb-3">MemoExam</h3>

              <p className="mb-4 text-white text-opacity-75">
                La plateforme numéro 1 d'épreuves et corrigés au Cameroun.
                Accédez à des milliers de ressources éducatives pour réussir vos
                examens.
              </p>
              <div className="d-flex gap-3">
                <a
                  href="/"
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center transition-all link"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="icon" />
                </a>
                <a
                  href="/"
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center transition-all link"
                >
                  <FontAwesomeIcon icon={faYoutube} className="icon" />
                </a>
                <a
                  href="/"
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center transition-all link"
                >
                  <FontAwesomeIcon icon={faInstagram} className="icon" />
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold fs-4 mb-3">Liens rapides</h3>
              <ul className="list-unstyled d-grid gap-2">
                <li>
                  <a
                    href="/"
                    className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
                  >
                    Épreuves
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
                  >
                    Corrigés
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold fs-4 mb-3">Contact</h3>
              <div className="d-grid gap-3">
                <div className="d-flex align-items-start">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 me-3" />
                  <span>contact@memoexam.com</span>
                </div>
                <div className="d-flex align-items-start">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 me-3" />
                  <span>+237 679 98 56 49</span>
                </div>
                <div className="d-flex align-items-start">
                  <FontAwesomeIcon icon={faMapMarker} className="mt-1 me-3" />
                  <span>Yaoundé, Cameroun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark py-3 text-center small">
          <div className="container px-4">
            <p>© 2025 MemoExam - Tous droits réservés.</p>
            <div className="mt-2 d-flex justify-content-center gap-3">
              <a
                href="/"
                className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
              >
                Conditions d'utilisation
              </a>
              <span className="text-white text-opacity-50">|</span>
              <a
                href="/"
                className="text-white text-opacity-75 hover-text-white text-decoration-none transition-all"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

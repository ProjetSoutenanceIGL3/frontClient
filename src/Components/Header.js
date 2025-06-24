import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Logo from "./../assets/memoE.png";

export default function Header() {
  return (
    <>
      {/* Hero Section */}
      <div className="position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20education%20concept%20with%20blue%20gradient%20background%20on%20left%20side%20transitioning%20to%20an%20image%20of%20students%20studying%20with%20books%20and%20digital%20devices%2C%20professional%20lighting%2C%20clean%20composition%2C%20inspiring%20educational%20atmosphere&width=1440&height=500&seq=12346&orientation=landscape"
            alt="Education background"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div
          className="container px-4 py-5 position-relative z-1"
          style={{ marginLeft: "100px" }}
        >
          <div className="d-flex flex-column flex-lg-row align-items-center">
            <div className="col-lg-6 text-white">
              <img
                src={Logo}
                alt="MemoExam Logo"
                width="400px"
                height="350px"
              />
              <p className="text-white text-opacity-75 mb-3 fw-medium">
                La plateforme numéro 1 d'épreuves et corrigés au Cameroun
              </p>
              <p className="mb-4 fs-5" style={{ maxWidth: "36rem" }}>
                Accédez en un clic aux sujets d'examen officiels du Cameroun, de
                la 6ème en terminal. Préparez-vous efficacement avec des
                ressources fiables, gratuites et toujours à jour.
              </p>

              <div
                className="d-flex mb-6 gap-3 flex-wrap"
                style={{ maxWidth: "40rem", maxHeight: "20rem" }}
              >
                <div
                  className="text-center bg-white bg-opacity-10 rounded-3 p-3"
                  style={{ width: "10rem", backdropFilter: "blur(10px)" }}
                >
                  <div className="fw-bold fs-3">+10 000</div>
                  <div className="small">Épreuves</div>
                </div>
                <div
                  className="text-center bg-white bg-opacity-10 rounded-3 p-3"
                  style={{ width: "10rem", backdropFilter: "blur(10px)" }}
                >
                  <div className="fw-bold fs-3">+10 000</div>
                  <div className="small">Copies</div>
                </div>
                <div
                  className="text-center bg-white bg-opacity-10 rounded-3 p-3"
                  style={{
                    width: "10rem",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="fw-bold fs-3">+10 000</div>
                  <div className="small">Utilisateurs</div>
                </div>
              </div>

              <button className="bg-white text-primary px-4 py-2 rounded-3 shadow-lg fw-semibold hover-bg-light transition-all cursor-pointer">
                Commencer maintenant{" "}
                <FontAwesomeIcon icon={faArrowRight} className=" ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

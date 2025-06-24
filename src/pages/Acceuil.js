import {
  faBook,
  faChevronDown,
  faChevronUp,
  faDownload,
  faEye,
  faFilePdf,
  faShare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import ScrollingBar from "../Components/defilement";
import Footer from "../Components/footer";
import Pagination from "../Components/pagination";
import PDFViewerModal from "../Components/pdf";
import ProcessLoading from "../Components/processLoading";
import axiosInstance from "./../api/axiosInstance";
import "./../style/app.css"; // Assuming you have a CSS file for styles

const Acceuil = () => {
  const [epreuves, setEpreuves] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [etablissements, setEtablissemsnts] = useState([]);
  const [options, setOptions] = useState([]);
  const [examens, setExamens] = useState([]);
  //const [series, setSeries] = useState([]);
  const [sequence, setSequence] = useState([]);

  const [activeFilter, setActiveFilter] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [selectedEpreuve, setSelectedEpreuve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({
    show: false,
    loading: false,
    success: false,
    message: "",
  });

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, show: false }));

    // Redirection après un léger délai pour la fluidité
    if (modalState.success) {
      setTimeout(() => {}, 50);
    }
  };

  const toggleDropdown = (type) => {
    setDropdownOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleFilterSelect = (type, value) => {
    if (value === "Tous") {
      // Supprime le filtre pour ce champ
      setActiveFilter((prev) => {
        const newFilters = { ...prev };
        delete newFilters[type];
        return newFilters;
      });
    } else {
      // Ajoute ou modifie le filtre
      setActiveFilter((prev) => ({ ...prev, [type]: value }));
    }

    // Ferme le dropdown
    setDropdownOpen((prev) => ({ ...prev, [type]: false }));
  };

  const handleAnnuler = () => {
    setActiveFilter({});
    setDropdownOpen({});
    setAccordionOpen(false);
  };

  useEffect(() => {
    //requette axios pour la recuperation des epreuves
    async function getEpreuve() {
      try {
        const response = await axiosInstance.get("epreuve/liste-epreuve");
        setEpreuves(response.data);
        setLoading(false);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des etablissements
    async function getEtablissement() {
      try {
        const response = await axiosInstance.get(
          "etablissement/lister-les-etablissements"
        );
        setEtablissemsnts(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des Classes
    async function getClasse() {
      try {
        const response = await axiosInstance.get("classe/getAll");
        setClasses(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des Matieres
    async function getMatiere() {
      try {
        const response = await axiosInstance.get("matiere/Lister-les-matieres");
        setMatieres(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des Sessions
    async function getSession() {
      try {
        const response = await axiosInstance.get("session/Lister-les-sessions");
        setSessions(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des Options
    async function getOption() {
      try {
        const response = await axiosInstance.get("option/Lister-les-options");
        setOptions(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des Examens
    async function getExamen() {
      try {
        const response = await axiosInstance.get("examen/lister-les-examens");
        setExamens(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    //requette axios pour la recuperation des Series
    // async function getSerie() {
    //   try {
    //     const response = await axiosInstance.get("epreuve/liste-epreuve");
    //     setSeries(response.data);
    //   } catch (error) {
    //     console.error("erreur:", error);
    //   }
    // }

    //requette axios pour la recuperation des sequences
    async function getSequence() {
      try {
        const response = await axiosInstance.get(
          "sequence/Lister-les-sequences"
        );
        setSequence(response.data);
      } catch (error) {
        console.error("erreur:", error);
      }
    }
    getSequence();
    getEpreuve();
    getClasse();
    getExamen();
    getMatiere();
    getOption();
    //getSerie();
    getSession();
    getEtablissement();
  }, []); // ← nécessaire pour ne pas avoir de boucle infinie

  const filterOptions = {
    etablissement: ["Tous", ...etablissements.map((ets) => ets.nomE)],
    classe: ["Tous", ...classes.map((ets) => ets.libelle)],
    matiere: ["Tous", ...matieres.map((ets) => ets.nomM)],
    serie: ["Tous", ...options.map((op) => op.nomOp)],
    examen: ["Tous", ...examens.map((ex) => ex.typeEx)],
    sequence: ["Tous", ...sequence.map((seq) => seq.numSeq)],
    session: ["Tous", ...sessions.map((ses) => ses.periode)],
  };

  // Charger le PDF d'une épreuve spécifique
  const loadEpreuvePDF = async (epreuve) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`epreuve/${epreuve.id}/pdf`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfFile = new File([pdfBlob], `${epreuve.titre}.pdf`, {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      setSelectedEpreuve({
        ...epreuve,
        pdfFile: pdfFile,
      });
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  // Charger le PDF de la correction d'une épreuve spécifique

  const loadCorrectionPDF = async (epreuve) => {
    try {
      const response = await axiosInstance.get(`correction/${epreuve.id}/pdf`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfFile = new File(
        [pdfBlob],
        `${epreuve.titre || "Correction"}.pdf`,
        {
          type: "application/pdf",
          lastModified: Date.now(),
        }
      );

      setSelectedEpreuve({
        ...epreuve,
        pdfFile: pdfFile,
      });
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtrerEpreuves = () => {
    return epreuves.filter((epreuve) => {
      return Object.entries(activeFilter).every(([key, value]) => {
        console.log(epreuve[key]);

        return (
          epreuve[key] &&
          epreuve[key].toString().toLowerCase() ===
            value.toString().toLowerCase()
        );
      });
    });
  };

  //telecharger une epreuve
  const download = async (epreuve) => {
    setModalState({
      show: true,
      loading: true,
      success: false,
      message: "Veuillez patienter, votre telechargement est en cours...",
    });
    try {
      const response = await axiosInstance.get(`epreuve/${epreuve.id}/pdf`, {
        responseType: "blob",
      });
      setLoading(false);

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `epreuve__de_${epreuve.titre}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setModalState({
        show: true,
        loading: false,
        success: true,
        message: "telechargement termine !",
      });
    } catch (err) {
      setModalState({
        show: true,
        loading: false,
        success: false,
        message: "Erreur lors de telechargement",
      });
      throw new Error("erreur", err);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Hero Section */}
      <Header />
      <ScrollingBar />

      {/* Search Filters */}
      <div className="bg-white py-4 shadow">
        <div className="container px-4">
          <h2 className="text-center text-dark fs-3 fw-semibold mb-4">
            Filtrer les épreuves
          </h2>

          <div className="accordion mb-4" id="accordionFiltres">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFiltres">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => setAccordionOpen(!accordionOpen)}
                >
                  Cliquez ici pour Afficher le filtre
                </button>
              </h2>

              {accordionOpen && (
                <div className="accordion-collapse show">
                  <div className="accordion-body">
                    <div className="row g-3">
                      {[
                        "etablissement",
                        "classe",
                        "matiere",
                        "serie",
                        "examen",
                        "session",
                      ].map((filterKey) => (
                        <div className="col-md-4 col-sm-6" key={filterKey}>
                          <label className="form-label text-secondary small fw-medium">
                            {filterKey.charAt(0).toUpperCase() +
                              filterKey.slice(1)}
                          </label>
                          <div className="position-relative">
                            <button
                              className="w-100 bg-light text-dark px-4 py-2 rounded-3 d-flex align-items-center justify-content-between border border-secondary"
                              onClick={() => toggleDropdown(filterKey)}
                            >
                              {activeFilter[filterKey] || "Tous"}
                              <FontAwesomeIcon
                                icon={
                                  dropdownOpen[filterKey]
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                className="ms-2 fs-6"
                              />
                            </button>
                            {dropdownOpen[filterKey] && (
                              <div
                                className="animate__animated animate__fadeIn position-absolute mt-1 w-100 bg-white border rounded-3 shadow z-2"
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                {filterOptions[filterKey].map((option, idx) => (
                                  <div
                                    key={idx}
                                    className="px-3 py-2 hover-bg-light cursor-pointer"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      console.log(filterKey, option);

                                      handleFilterSelect(filterKey, option);
                                    }}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Affichage dynamique de SEQUENCE si examen = Évaluation */}
                      {activeFilter.examen === "evaluation" && (
                        <div className="col-md-4 col-sm-6 animate__animated animate__fadeIn">
                          <label className="form-label text-secondary small fw-medium">
                            Séquence
                          </label>
                          <div className="position-relative">
                            <button
                              className="w-100 bg-light text-dark px-4 py-2 rounded-3 d-flex align-items-center justify-content-between border border-secondary"
                              onClick={() => toggleDropdown("sequence")}
                            >
                              {activeFilter["sequence"] || "Tous"}
                              <FontAwesomeIcon
                                icon={
                                  dropdownOpen["sequence"]
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                className="ms-2 fs-6"
                              />
                            </button>
                            {dropdownOpen["sequence"] && (
                              <div
                                className="animate__animated animate__fadeIn position-absolute mt-1 w-100 bg-white border rounded-3 shadow z-2"
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                {filterOptions["sequence"].map(
                                  (option, idx) => (
                                    <div
                                      key={idx}
                                      className="px-3 py-2 hover-bg-light cursor-pointer"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleFilterSelect("sequence", option)
                                      }
                                    >
                                      {option}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bouton Annuler */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                      <button
                        className="btn btn-danger px-4 shadow fw-semibold"
                        onClick={handleAnnuler}
                      >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-light py-5 flex-grow">
        <div className="container px-4">
          <h2 className="fs-3 fw-semibold text-dark mb-4">
            Résultats de recherche({filtrerEpreuves().length})
          </h2>

          <div className="row g-4">
            {/* {filtrerEpreuves().length === 0 ? (
              <div className="text-center text-muted">
                Aucune épreuve trouvée avec ces filtres.
              </div> */}
            {loading ? (
              <div className="pdf-loading-container">
                <div className="pdf-spinner"></div>
                <p>Chargement des epreuves...</p>
              </div>
            ) : (
              filtrerEpreuves().map((doc) => (
                <div
                  key={doc.id}
                  className="col-12 bg-white rounded-3 shadow-sm p-4 d-flex align-items-start hover-shadow transition-all"
                >
                  <div className="me-4 flex-shrink-0">
                    <div className="w-20 h-40 bg-danger bg-opacity-10 d-flex align-items-center justify-content-center rounded-3 border border-danger border-opacity-25 shadow-sm">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className="text-danger fs-3"
                        style={{ height: "40px" }}
                      />
                    </div>
                    <div className="small text-center mt-2 text-muted fw-medium">
                      {doc.session}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <h3
                      className="fw-semibold text-dark fs-5 mb-3"
                      style={{ marginLeft: "30px" }}
                    >
                      {`${doc.titre.toUpperCase()}-${doc.etablissement.toUpperCase()}-${doc.session.toUpperCase()}`}
                    </h3>
                    <div
                      className="d-flex gap-4"
                      style={{ marginLeft: "20px" }}
                    >
                      <button
                        onClick={() => loadEpreuvePDF(doc)}
                        className="text-primary hover-text-primary-dark d-flex align-items-center cursor-pointer rounded-pill text-nowrap fw-medium border-0 bg-transparent"
                      >
                        <FontAwesomeIcon icon={faEye} className="me-2" />
                        Visualiser
                      </button>
                      <button
                        onClick={() => loadCorrectionPDF(doc)}
                        className="text-primary hover-text-primary-dark d-flex align-items-center cursor-pointer rounded-pill text-nowrap fw-medium border-0 bg-transparent"
                      >
                        <FontAwesomeIcon icon={faBook} className="me-2" />
                        Correction
                      </button>
                      <button
                        onClick={() => download(doc)}
                        className="text-primary hover-text-primary-dark d-flex align-items-center cursor-pointer rounded-pill text-nowrap fw-medium border-0 bg-transparent"
                      >
                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                        Télécharger
                      </button>
                      <button className="text-muted hover-text-dark d-flex align-items-center cursor-pointer rounded-pill text-nowrap fw-medium border-0 bg-transparent">
                        <FontAwesomeIcon icon={faShare} className="me-2" />
                        Partager
                      </button>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      {doc.typeExamen.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            totalPages={10}
            onPageChange={(page) => {
              console.log("Page sélectionnée :", page);
              // Ici tu peux appeler ton API ou changer les données affichées
            }}
          />
        </div>
      </div>
      {/* footer */}
      <Footer />
      <ProcessLoading
        show={modalState.show}
        loading={modalState.loading}
        success={modalState.success}
        message={modalState.message}
        onClose={closeModal}
        autoCloseDelay={3000} // Ferme automatiquement après 3s si succès
        onAutoClose={closeModal}
      />
      {/* Modal pour afficher le PDF */}
      {selectedEpreuve && (
        <PDFViewerModal
          pdfFile={selectedEpreuve.pdfFile}
          onClose={() => setSelectedEpreuve(null)}
          title={`${selectedEpreuve.nom} - ${selectedEpreuve.matiere}`}
        />
      )}
    </div>
  );
};

export default Acceuil;

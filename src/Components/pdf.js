import * as pdfjsLib from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import "./../style/pdf.css";

// Configuration du worker PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

const PDFViewerModal = ({ pdfFile, onClose }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isRendering, setIsRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  // Fonction pour lire le fichier comme ArrayBuffer
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  useEffect(() => {
    const loadPDF = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!pdfFile) {
          throw new Error("Aucun fichier PDF fourni");
        }

        // Convertir le fichier en ArrayBuffer
        const arrayBuffer = await readFileAsArrayBuffer(pdfFile);

        // Charger le PDF
        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          disableAutoFetch: true,
          disableStream: false,
        });

        const pdfDocument = await loadingTask.promise;

        if (!pdfDocument.numPages) {
          throw new Error("Le PDF semble vide ou corrompu");
        }

        setPdfDoc(pdfDocument);
        renderPage(pdfDocument, 1);
      } catch (err) {
        console.error("Erreur de chargement PDF:", err);
        setError(err.message || "Erreur de chargement du PDF");
      } finally {
        setIsLoading(false);
      }
    };

    loadPDF();

    return () => {
      // Nettoyage
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [pdfFile]);

  const renderPage = async (pdf, num) => {
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }

    setIsRendering(true);
    try {
      const page = await pdf.getPage(num);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;

      // Ajuster la taille du canvas
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Rendu de la page
      renderTaskRef.current = page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      });

      await renderTaskRef.current.promise;
      setPageNum(num);
    } catch (err) {
      if (err.name !== "RenderingCancelledException") {
        console.error("Erreur de rendu:", err);
        setError("Erreur lors de l'affichage de la page");
      }
    } finally {
      setIsRendering(false);
    }
  };

  const onPrevPage = () => {
    if (pageNum <= 1) return;
    renderPage(pdfDoc, pageNum - 1);
  };

  const onNextPage = () => {
    if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
    renderPage(pdfDoc, pageNum + 1);
  };

  const zoomIn = () => {
    const newScale = Math.min(scale + 0.25, 3.0);
    setScale(newScale);
    pdfDoc && renderPage(pdfDoc, pageNum);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.25, 0.5);
    setScale(newScale);
    pdfDoc && renderPage(pdfDoc, pageNum);
  };

  return (
    <div className="pdf-modal-overlay">
      <div className="pdf-modal">
        <div className="pdf-modal-header">
          <h2>{pdfFile?.name || "Document PDF"}</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        {isLoading ? (
          <div className="pdf-loading-container">
            <div className="pdf-spinner"></div>
            <p>Chargement du PDF...</p>
          </div>
        ) : error ? (
          <div className="pdf-error">
            <p>{error}</p>
            <button onClick={onClose}>Fermer</button>
          </div>
        ) : (
          <>
            <div className="pdf-controls">
              <button
                onClick={onPrevPage}
                disabled={pageNum <= 1 || isRendering}
              >
                Précédent
              </button>
              <button
                onClick={onNextPage}
                disabled={!pdfDoc || pageNum >= pdfDoc.numPages || isRendering}
              >
                Suivant
              </button>
              <button onClick={zoomOut} disabled={isRendering}>
                -
              </button>
              <span>{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} disabled={isRendering}>
                +
              </button>
              <span className="page-info">
                Page: <span>{pageNum}</span> /{" "}
                <span>{pdfDoc?.numPages || "--"}</span>
              </span>
            </div>

            <div className="pdf-canvas-container">
              {isRendering && (
                <div className="pdf-rendering">Chargement de la page...</div>
              )}
              <canvas ref={canvasRef} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFViewerModal;

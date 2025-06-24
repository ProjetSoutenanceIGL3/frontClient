import {
  faCheckCircle,
  faSpinner,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import React from "react";
import "./../style/processLoading.css";

const ProcessLoading = ({
  show,
  loading,
  success,
  message,
  onClose,
  autoCloseDelay,
  onAutoClose,
}) => {
  // Fermeture automatique si configurée
  React.useEffect(() => {
    if (show && !loading && autoCloseDelay) {
      const timer = setTimeout(() => {
        onAutoClose?.();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [show, loading, autoCloseDelay, onAutoClose]);

  if (!show) return null;

  const getIcon = () => {
    if (loading) return faSpinner;
    if (success) return faCheckCircle;
    return faTimesCircle;
  };

  const getIconColor = () => {
    if (loading) return "text-primary";
    return "text-danger";
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center p-5">
            <FontAwesomeIcon
              icon={getIcon()}
              spin={loading}
              size="3x"
              className={`mb-3 `}
              style={{ color: "#0d6efd" }}
            />
            <h4 className="mb-3">{message}</h4>

            {!loading && (
              <button
                className="btn mt-3"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
                onClick={onClose}
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProcessLoading.propTypes = {
  show: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
  autoCloseDelay: PropTypes.number,
  onAutoClose: PropTypes.func,
};

ProcessLoading.defaultProps = {
  loading: false,
  success: false,
  message: "Traitement en cours...",
  autoCloseDelay: 0,
};

export default ProcessLoading;

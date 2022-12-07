import { Button } from "components/styled";
import { XCircle } from "phosphor-react";
import { useState } from "react";
import "./model.css";

const Modal = ({
  onClose,
  onConfirm,
  confirmBtn = "Confirm",
  closeBtn = "Close",
  children,
}) => {
  const [visible, setVisible] = useState(true);

  const closeHandle = () => {
    setVisible(false);

    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();

    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="model-wrapper">
          <div className="model-container">
            <div className="model">
              <div className="model-close ">
                <Button danger onClick={closeHandle}>
                  <XCircle size={25} />
                </Button>
              </div>

              <div className="btn-container">
                <Button secondary onClick={closeHandle}>
                  {closeBtn}
                </Button>
              </div>

              {children}
              <div className="btn-containers ">
                <Button size="3rem" primary onClick={handleConfirm}>
                  {confirmBtn}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;

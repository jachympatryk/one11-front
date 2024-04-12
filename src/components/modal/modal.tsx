import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalComponent: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
            setShouldRender(true);
        } else {
            setShowModal(false); // Start the closing animation
        }
    }, [isOpen]);

    useEffect(() => {
        if (!showModal) {
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300); // Wait for the animation to finish
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    const handleOverlayClick = () => {
        setShowModal(false);
    };

    const handleContentClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation(); // Prevent the modal from closing when its content is clicked
    };

    const onAnimationEnd = () => {
        if (!showModal) {
            onClose(); // Notify parent to update the isOpen state
        }
    };

    return shouldRender
        ? ReactDOM.createPortal(
              <div
                  className={`${styles.modalOverlay} ${showModal ? styles.fadeIn : styles.fadeOut}`}
                  onClick={handleOverlayClick}
                  onAnimationEnd={onAnimationEnd}
              >
                  <div
                      className={`${styles.modalContent} ${showModal ? styles.slideIn : styles.slideOut}`}
                      onClick={handleContentClick}
                  >
                      {children}
                      <button
                          className={styles.closeButton}
                          onClick={() => setShowModal(false)}
                      >
                          Zamknij
                      </button>
                  </div>
              </div>,
              document.getElementById('modal-root') as HTMLElement
          )
        : null;
};

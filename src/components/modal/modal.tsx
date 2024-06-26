import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
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
    onClose(); // Use onClose to handle state change in parent
  };

  const handleContentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent the modal from closing when its content is clicked
  };

  const handleButtonClick = () => {
    onClose();
  };

  const onAnimationEnd = () => {
    if (!showModal) {
      onClose(); // Notify parent to update the isOpen state
    }
  };

  return shouldRender
    ? ReactDOM.createPortal(
        <div
          className={` ${styles.modalOverlay} ${showModal ? styles.fadeIn : styles.fadeOut}`}
          onClick={handleOverlayClick}
          onAnimationEnd={onAnimationEnd}
        >
          <div
            className={` ${styles.modalContent} ${showModal ? styles.slideIn : styles.slideOut} ${className ? className : ''}`}
            onClick={handleContentClick}
          >
            <div className={styles.header}>
              <p>{title ? title : ''}</p>
              <button
                className={styles.closeButton}
                onClick={handleButtonClick}
              >
                X
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )
    : null;
};

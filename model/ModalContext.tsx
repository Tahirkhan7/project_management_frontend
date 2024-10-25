import React, { createContext, useContext, useState } from 'react';

// Create a Context
const ModalContext = createContext<any>(null);

// Create a provider component
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Create a custom hook to use the ModalContext
export const useModal = () => useContext(ModalContext);

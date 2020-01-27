import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import tw from 'tailwind.macro';
import Modal, { BaseModalBackground } from "styled-react-modal";
import { Close } from 'styled-icons/material';

const ModalClose = styled(Close)`
  ${tw`
    absolute
    top-0 right-0
    cursor-pointer
    flex flex-col items-center
    mt-3 mr-3
    text-black
    z-50
  `}
`;

const FadingBackground = styled(BaseModalBackground)`
  ${tw`
    absolute
    w-full h-full
  `}
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

const StyledModal = Modal.styled`
  ${tw`
    bg-white
    overflow-y-auto
    relative
    rounded shadow-lg
    w-11/12 md:max-w-md mx-auto
    z-50
  `}
  opacity: ${props => props.opacity};
  transition: opacity ease 500ms;
`;

function ModalButton({label, children}) {
  const [isOpen, setIsOpen, beforeOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 0);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 0);
    });
  }

  return (
    <div>
      <span onClick={toggleModal}>{label}</span>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}>
        <ModalClose size="25" onClick={toggleModal} />
        {children}
      </StyledModal>
    </div>
  );
}

export {
  FadingBackground,
  ModalButton
}


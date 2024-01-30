import { useModalProps } from "../Components/ModalRoot"
import React from "react"

type ModalProps = { children: React.ReactNode }

const ModalPopUpContainer: React.FC<ModalProps> = ({ children }) => {

    const { closeModal } = useModalProps()

    return (
        <div onClick={() => closeModal(false)} data-modal-type='back'>
            <div data-modal-type='container'>
                {children}
            </div>
        </div>
    )
}

export { ModalPopUpContainer }


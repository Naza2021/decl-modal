import { ModalProps } from "decl-modal"
import { generateModal, useModalProps } from "decl-modal/react"

interface ModalContainerProps { children: React.ReactNode, onCloseResponse?: any }

const ModalContainer: React.FC<ModalContainerProps> = ({ children, onCloseResponse = false }) => {

  const { closeModal, RootProps } = useModalProps()

  return (
    <div className='flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full' onClick={() => closeModal(onCloseResponse)} {...RootProps}>
      <div className='m-auto' onClick={(e) => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

interface ModalComponentProps extends ModalProps<string | false> {

}

const ModalComponent: React.FC<ModalComponentProps> = ({ }) => {

  return (
    <ModalContainer>
      <div className="p-5 bg-white rounded-md flex flex-col">
        <h1 className="font-bold">Hola!</h1>
      </div>
    </ModalContainer>
  )
}


export const [showModal, ModalRoot] = generateModal({ Modals: { ModalComponent }, waitAnimation: false })
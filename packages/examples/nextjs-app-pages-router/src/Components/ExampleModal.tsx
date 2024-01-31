import { ModalProps } from "decl-modal"
import { generateModal, useModalProps } from "decl-modal/react"

interface ModalContainerProps { children: React.ReactNode }

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {

  const { closeModal } = useModalProps()

  return (
    <div className='flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full' onClick={() => closeModal(false)} data-modal-type='back'>
      <div className='m-auto' data-modal-type='container' onClick={(e) => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

interface ModalComponentProps extends ModalProps<string | false> {

}

const ModalComponent: React.FC<ModalComponentProps> = ({ closeModal }) => {

  return (
    <ModalContainer>
      <div className="p-5 bg-white rounded-md flex flex-col">
        <h1 className="font-bold">Input:</h1>
        <input className="p-2 font-bold border border-solid border-black rounded-[4px]" id='my-modal-input' />
        <button className="bg-black rounded-md py-2 px-8 font-bold text-white self-end mt-4" onClick={() => {
          closeModal((document.querySelector(`#my-modal-input`) as HTMLInputElement).value)
        }}>
          Ok k k
        </button>
      </div>
    </ModalContainer>
  )
}


export const [showModal, ModalRoot] = generateModal({ Modals: { ModalComponent }, waitAnimation: false })
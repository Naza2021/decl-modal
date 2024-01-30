import { useModalProps } from "decl-modal/react"

interface MyGenericContainerProps { children: React.ReactNode }

const MyGenericContainer: React.FC<MyGenericContainerProps> = ({ children }) => {

  const { closeModal } = useModalProps()

  return (
    <div className='flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full' onClick={() => closeModal(false)} data-modal-type='back'>
      <div className='m-auto' data-modal-type='container' onClick={(e) => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

export { MyGenericContainer }


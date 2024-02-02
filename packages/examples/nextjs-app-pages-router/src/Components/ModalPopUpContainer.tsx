import { useModalProps } from "decl-modal/react"

interface MyGenericContainerProps { children: React.ReactNode }

const MyGenericContainer: React.FC<MyGenericContainerProps> = ({ children }) => {

  const { closeModal, RootProps } = useModalProps()

  return (
    <div className='flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full' onClick={() => closeModal(false)} {...RootProps}>
      <div className='m-auto' onClick={(e) => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

export { MyGenericContainer }


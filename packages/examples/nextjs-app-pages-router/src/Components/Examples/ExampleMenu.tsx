import { type ModalProps } from "@nazfy/modal-react"
import { type AnimConfig, generateModal, useModalProps } from "@nazfy/modal-react"

export const MenuAnimation = {
  container: {
    keyframes: {
      transform: ['translateX(100%)', 'translateX(0%)']
    },
    config: { duration: 300, easing: 'cubic-bezier(.17,.67,.32,.96)', reverse: true }
  },
  back: {
    config: { duration: 300 }
  }
} satisfies AnimConfig

interface MenuContainerProps { children: React.ReactNode, onCloseResponse?: any }

const MenuContainer: React.FC<MenuContainerProps> = ({ children, onCloseResponse = false }) => {

  const { closeModal, RootProps } = useModalProps()

  return (
    <div className='flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full' onClick={() => closeModal(onCloseResponse)} {...RootProps}>
      <div className='h-full ml-auto max-w-full' onClick={(e) => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

interface MenuComponentProps extends ModalProps<string | false> {

}

const MenuComponent: React.FC<MenuComponentProps> = ({ }) => {

  return (
    <MenuContainer>
      <div className="p-12 bg-white flex flex-col h-full w-[25rem]">
        <h1 className="font-bold">Hola desde menu!</h1>
      </div>
    </MenuContainer>
  )
}


export const [showMenu, MenuRoot] = generateModal({ Modals: { MenuComponent } })
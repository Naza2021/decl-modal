
import { ModalProps } from "decl-modal"
import { generateModal, useTooltipPosition } from "decl-modal/react"

interface PopupContainerProps {
  target: HTMLElement,
  children: React.ReactNode
}

const PopupContainer: React.FC<PopupContainerProps> = ({ target, children }) => {

  const coords = useTooltipPosition({ target })

  return (
    <div className='fixed opacity-0 z-10' data-modal-type='back' style={{ top: `${coords.y}px`, left: `${coords.x}px` }}>
      <div data-modal-type='container'>
        {children}
      </div>
    </div>
  )
}

interface PopupProps extends ModalProps<undefined> {
  target: PopupContainerProps['target'],
  content: string
}

const Popup: React.FC<PopupProps> = ({ target }) => {
  return (
    <PopupContainer target={target}>
      <div className="p-4 rounded-md bg-white font-bold text-xs break-keep whitespace-nowrap">
        <button className="bg-black rounded-md py-2 px-4 font-bold text-white active:bg-[#464646]">
          Button
        </button>
      </div>
    </PopupContainer>
  )
}

const [showMethod, PopupRoot] = generateModal(Popup)

// Wrapper method of showMethod to improve its use
const showMyPopup = (domEvent: any, content: PopupProps['content']) => {
  showMethod({
    target: domEvent.target as HTMLElement, content
  }, { override: false })
}

export { PopupRoot, showMyPopup }


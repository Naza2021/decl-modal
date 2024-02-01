import { ModalProps } from "decl-modal"
import { AnimConfig, generateModal, useModalProps } from "decl-modal/react"
import { useEffect, useRef, useState } from "react"

export const TooltipAnimation =
  {
    back: { config: { duration: 300, delay: 300 } },
    container: { config: { delay: 300 } }
  } satisfies AnimConfig

interface TooltipContainerProps {
  target: HTMLElement,
  children: React.ReactNode
}

const getOffset = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height
  };
}

const TooltipContainer: React.FC<TooltipContainerProps> = ({ target, children }) => {
  const selfReference = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const { closeModal } = useModalProps()

  useEffect(() => {
    if (!selfReference.current) return

    if (!target) return

    const offsets = getOffset(target)

    const firstResolution = { x: offsets.left + offsets.width / 2 - selfReference.current.clientWidth / 2, y: offsets.top - selfReference.current.clientHeight - 10 }

    const offsetX = Math.max((firstResolution.x + selfReference.current.clientWidth + 20) - document.documentElement.clientWidth, 0)

    setCoords({ x: firstResolution.x - offsetX, y: offsets.top - selfReference.current.clientHeight - 10 })

    target.addEventListener('mouseout', () => closeModal(false), { once: true })

  }, [])

  return (
    <div className='fixed pointer-events-none opacity-0' style={{ top: coords.y, left: coords.x }} ref={selfReference} data-modal-type='back'>
      <div data-modal-type='container'>
        {children}
      </div>
    </div>
  )
}

interface TooltipProps extends ModalProps<undefined> {
  target: TooltipContainerProps['target'],
  content: string
}

const Tooltip: React.FC<TooltipProps> = ({ target, content }) => {
  return (
    <TooltipContainer target={target}>
      <div className="p-2 rounded-md bg-white font-bold text-xs break-keep whitespace-nowrap">
        {content}
      </div>
    </TooltipContainer>
  )
}

const [showMethod, TooltipRoot] = generateModal(Tooltip)

// Wrapper method of showMethod to improve its use
const showMyTooltip = (content: TooltipProps['content']) => ({
  onMouseEnter: (e: any) => {
    showMethod({ target: e.target as HTMLElement, content }, { override: false })
  }
})

export { TooltipRoot, showMyTooltip }


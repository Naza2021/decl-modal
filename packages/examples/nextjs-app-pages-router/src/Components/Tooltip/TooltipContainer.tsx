import { ModalProps } from "decl-modal"
import { useEffect, useRef, useState } from "react"

interface TooltipContainerProps extends ModalProps {
  target: HTMLElement
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

const TooltipContainer: React.FC<TooltipContainerProps> = ({ target, closeModal }) => {
  const selfReference = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!selfReference.current) return

    const offsets = getOffset(target)

    const firstResolution = { x: offsets.left + offsets.width / 2 - selfReference.current.clientWidth / 2, y: offsets.top - selfReference.current.clientHeight - 10 }

    const offsetX = Math.max((firstResolution.x + selfReference.current.clientWidth + 20) - document.documentElement.clientWidth, 0)

    setCoords({ x: firstResolution.x - offsetX, y: offsets.top - selfReference.current.clientHeight - 10 })

    target.addEventListener('mouseout', () => closeModal(false), { once: true })

  }, [])

  return (
    <div className='fixed pointer-events-none opacity-0' style={{ top: coords.y, left: coords.x }} ref={selfReference} data-modal-type='back'>
      <div className="p-2 rounded-md bg-white font-bold text-xs break-keep whitespace-nowrap" data-modal-type='container'>
        Hello world! :)
      </div>
    </div>
  )
}

export { TooltipContainer }


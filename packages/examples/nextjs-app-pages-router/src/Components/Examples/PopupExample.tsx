import { ModalProps } from "decl-modal"
import { generateModal, useModalProps } from "decl-modal/react"
import { useEffect, useState } from "react"

interface PopupContainerProps {
  target: HTMLElement,
  children: React.ReactNode
}

const round = (number: number) => Math.floor(number * 100) / 100

const getOffsets = (el: HTMLElement, shift: number = 0) => {
  const rect = el.getBoundingClientRect();
  const offsets = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    width: rect.width,
    height: rect.height + shift
  }

  return offsets
}

const getRelativeOffset = (el: HTMLElement, relative?: any, shift: number = 0) => {

  const offsets = getOffsets(el, shift)

  return {
    x: (percetanje: number) => (relative ? offsets.left : 0) + round(offsets.width * (percetanje / 100)),
    y: (percetanje: number) => (relative ? offsets.top : 0) + round(offsets.height * (percetanje / 100))
  }
}

const PopupContainer: React.FC<PopupContainerProps> = ({ target, children }) => {
  const [coords, setCoords] = useState({ x: '0px', y: '0px' })
  const { closeModal } = useModalProps()

  useEffect(() => {
    const backTooltip = document.querySelector(`[data-modal-type=back]`) as HTMLDivElement
    if (!backTooltip) return

    if (!target) return

    const CustomOffsets = 60

    const debug = true

    const parseCoordinates = (object: { x: any, y: any }, offsets: any) => {
      return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, offsets[key](value)]))
    }

    const coordinates = {
      lt: { x: 0, y: 0 },
      t: { x: 50, y: 0 },
      rt: { x: 100, y: 0 },
      lb: { x: 0, y: 100 },
      b: { x: 50, y: 100 },
      rb: { x: 100, y: 100 },
    }

    const coordinatesContainer = {
      lt: { x: 0, y: 0 },
      t: { x: -50, y: 0 },
      rt: { x: -100, y: 0 },
      lb: { x: 0, y: -100 },
      b: { x: -50, y: -100 },
      rb: { x: -100, y: -100 },
    }

    const RelativeOffsets = getRelativeOffset(target, true, CustomOffsets)
    const ContainerOffsets = getRelativeOffset(backTooltip, false)
    const Coordinates = parseCoordinates(coordinates.b, RelativeOffsets)
    const ContainerCoordinates = parseCoordinates(coordinatesContainer.t, ContainerOffsets)
    const firstResolution = { x: Coordinates.x + ContainerCoordinates.x, y: Coordinates.y + ContainerCoordinates.y }


    // const offsetX = Math.max((firstResolution.x + backTooltip.clientWidth + 20) - document.documentElement.clientWidth, 0)

    console.log({ ContainerCoordinates })

    // setCoords({ x: firstResolution.x - offsetX, y: offsets.top + offsets.height })
    setCoords({ x: `${firstResolution.x}px`, y: `${firstResolution.y}px` })

    const generateZoneElement = (offsets: {
      position: number;
      opacity: number;
      top: number;
      left: number;
      height: number;
      width: number;
      bottom: number;
      right: number;
    }, offset: number) => {

      const zone = document.createElement('div')
      zone.setAttribute('data-modal-type', 'zone')
      Object.assign(zone.style, {
        position: 'fixed',
        top: `${offsets.top - offset}px`,
        left: `${offsets.left - offset}px`,
        height: `${offsets.height + offset * 2}px`,
        width: `${offsets.width + offset * 2}px`,
        border: debug ? '2px dashed white' : undefined,
        backgroundColor: debug ? '#FFFFFF1A' : undefined,
        // pointerEvents: 'none',
        // zIndex: '0'
      })
      backTooltip.insertBefore(zone, backTooltip.querySelector('[data-modal-type=container]'))

      return zone
    }

    // const promiseMouseLeave = async (element: HTMLDivElement) => {
    //   const promise = await new Promise((resolve) => element.addEventListener('mouseleave', (e) => {
    //     if (e.relatedTarget?.getAttribute?.('data-modal-type')) {
    //       if (e.relatedTarget.getAttribute('data-modal-type')) resolve(e.relatedTarget)
    //       return
    //     }

    //     resolve(true)
    //   }, { once: true }))

    //   if (promise instanceof HTMLDivElement) {
    //     return promiseMouseLeave(promise as any)
    //   }

    //   return true
    // }

    const zone1 = generateZoneElement(getOffsets(target) as any, CustomOffsets)
    const zone2 = generateZoneElement({ ...getOffsets(backTooltip) as any, top: firstResolution.y, left: firstResolution.x }, CustomOffsets)
    const zone3 = generateZoneElement(getOffsets(target) as any, 0)

    zone3.addEventListener('click', () => closeModal(), { once: true })
    Object.assign(zone3.style, { cursor: 'pointer', border: debug ? '2px dashed red' : undefined, backgrondColor: debug ? '#ff00001A' : undefined })

    new Promise(resolve => backTooltip.addEventListener('mouseleave', resolve, { once: true })).then(() => {
      closeModal(true)
    })
    // promiseMouseLeave(zone3).then(() => {
    //   // closeModal(false)
    // })
    // Promise.race(Array.from(document.querySelectorAll(`[data-modal-type=zone]`)).map).then(() => {
    //   closeModal(false)
    // })

    return () => {
      zone1.remove()
      zone2.remove()
      zone3.remove()
    }

    // target.addEventListener('mouseout', () => closeModal(false), { once: true })

  }, [])

  return (
    <div className='fixed opacity-0 z-10' style={{ top: coords.y, left: coords.x }} data-modal-type='back'>
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

const Popup: React.FC<PopupProps> = ({ target, closeModal }) => {
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


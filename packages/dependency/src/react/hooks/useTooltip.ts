import { useModalProps } from "decl-modal/react";
import { useEffect, useId, useState } from "react";

const round = (number: number) => Math.floor(number * 100) / 100

const getOffsets = (el: HTMLElement, shift: number = 0) => {
  const rect = el.getBoundingClientRect();
  const offsets = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY - shift,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    width: rect.width,
    height: rect.height + (shift * 2)
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


interface UseTooltipPositionProps {
  target: HTMLElement
  containerId?: string
  debug?: boolean
  containerOffsets?: number
  zoneOutOffsets?: number | true
  onZoneLeave?: () => void,
  pointTarget?: keyof typeof coordinatesContainer | typeof coordinatesContainer['rb']
  pointContainer?: keyof typeof coordinatesContainer | typeof coordinatesContainer['rb']
}

export const useTooltipPosition = ({ target, containerId = 'back', debug = false, containerOffsets = 20, zoneOutOffsets = 0, onZoneLeave, pointTarget, pointContainer }: UseTooltipPositionProps) => {

  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const { closeModal } = useModalProps()
  const customId = useId()

  useEffect(() => {
    const backTooltip = document.querySelector(`[data-modal-type="${containerId}"]`) as HTMLDivElement
    const processOnZoneLeave = onZoneLeave ?? closeModal
    if (!backTooltip) return

    if (!target) return

    const zoneOut = Boolean(zoneOutOffsets)
    const calculatedOffset = containerOffsets + (typeof zoneOutOffsets === 'boolean' ? 0 : zoneOutOffsets)
    const parseCoordinates = (object: { x: any, y: any }, offsets: any) => {
      return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, offsets[key](value)]))
    }

    const resizeEvent = (coornadinatesA: any = 'b', coordinatesB: any = 't') => {

      if (typeof coornadinatesA === 'string') coornadinatesA = (coordinates as any)?.[coornadinatesA]
      if (typeof coordinatesB === 'string') coordinatesB = (coordinatesContainer as any)?.[coordinatesB]

      const RelativeOffsets = getRelativeOffset(target, true, containerOffsets)
      const ContainerOffsets = getRelativeOffset(backTooltip, false)
      const Coordinates = parseCoordinates(coornadinatesA, RelativeOffsets)
      const ContainerCoordinates = parseCoordinates(coordinatesB, ContainerOffsets)
      const firstResolution = { x: Math.max(Coordinates.x + ContainerCoordinates.x, calculatedOffset), y: Coordinates.y + ContainerCoordinates.y }
      const documentOffsets = getOffsets(document.documentElement)
      const maxLeft = Math.max((firstResolution.x + ContainerOffsets.x(100) + calculatedOffset) - documentOffsets.width, 0)
      const resolutionLeft = firstResolution.x - maxLeft
      const finalResolution = resolutionLeft < 0 ? round((documentOffsets.width / 2) - (ContainerOffsets.x(100) / 2)) : resolutionLeft

      setCoords({ x: finalResolution, y: firstResolution.y })

      if (zoneOut) {
        const generateZoneElement = (offsets: {
          position: number;
          opacity: number;
          top: number;
          left: number;
          height: number;
          width: number;
          bottom: number;
          right: number;
        }, offset: number, zoneId: string) => {

          let zone = document.querySelector(`[data-modal-type="zone-${zoneId}"]`) as HTMLDivElement
          if (!zone) {
            zone = document.createElement('div')
            zone.setAttribute('data-modal-type', `zone-${zoneId}`)
            backTooltip.insertBefore(zone, backTooltip.querySelector('[data-modal-type=container]'))
          }

          Object.assign(zone.style, {
            position: 'fixed',
            top: `${offsets.top - offset}px`,
            left: `${offsets.left - offset}px`,
            height: `${offsets.height + offset * 2}px`,
            width: `${offsets.width + offset * 2}px`,
            border: debug ? '2px dashed white' : undefined,
            backgroundColor: debug ? '#FFFFFF1A' : undefined,
          })

          return zone
        }

        generateZoneElement(getOffsets(target) as any, calculatedOffset, `${customId}1`)
        generateZoneElement({ ...getOffsets(backTooltip) as any, top: firstResolution.y, left: finalResolution }, calculatedOffset, `${customId}2`)
        const zone3 = generateZoneElement(getOffsets(target) as any, 0, `${customId}3`)

        zone3.addEventListener('click', () => processOnZoneLeave(), { once: true })
        Object.assign(zone3.style, { cursor: 'pointer', border: debug ? '2px dashed red' : undefined, backgrondColor: debug ? '#ff00001A' : undefined })

        new Promise(resolve => backTooltip.addEventListener('mouseleave', resolve, { once: true })).then(() => {
          processOnZoneLeave?.()
        })

        return
      }

      if (processOnZoneLeave) {
        target.addEventListener('mouseleave', processOnZoneLeave, { once: true })
      }
    }

    const handlerResize = () => resizeEvent(pointTarget, pointContainer)
    handlerResize()
    window.addEventListener('resize', handlerResize)

    return () => {
      window.removeEventListener('resize', handlerResize)
      target.removeEventListener('mouseleave', processOnZoneLeave)
    }
  }, [])

  return coords
}

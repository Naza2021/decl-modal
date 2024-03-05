import { ModalProps } from "@nazfy/modal"
import { AnimConfig, generateModal, useModalProps, useTooltipPosition } from "@nazfy/modal/react"

export const TooltipAnimation =
  {
    back: { config: { duration: 300, delay: 300 } },
    container: { config: { delay: 300 } }
  } satisfies AnimConfig

interface TooltipContainerProps {
  target: HTMLElement,
  children: React.ReactNode
}

const TooltipContainer: React.FC<TooltipContainerProps> = ({ target, children }) => {

  const { RootProps } = useModalProps()

  const coords = useTooltipPosition({
    target,
    pointTarget: 't',
    pointContainer: 'b',
    containerOffsets: 10
  })

  return (
    <div className='fixed pointer-events-none opacity-0' style={{ top: coords.y, left: coords.x }} {...RootProps}>
      <div>
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

const [showMethod, TooltipRoot] = generateModal({ Modals: { Tooltip } })

// Wrapper method of showMethod to improve its use
const showMyTooltip = (content: TooltipProps['content']) => ({
  onMouseEnter: (e: any) => {
    showMethod('Tooltip', { target: e.target as HTMLElement, content }, { override: false })
  }
})

export { TooltipRoot, showMyTooltip }
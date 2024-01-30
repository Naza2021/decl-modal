import { ModalFactory } from "decl-modal"
import { TooltipContainer } from "./TooltipContainer"
import { ModalRoot } from "decl-modal/react"

const modalTooltip = ModalFactory.generate(TooltipContainer)

interface TooltipRootProps {

}

const TooltipRoot: React.FC<TooltipRootProps> = ({ }) => {
  return (
    <ModalRoot modalFactory={modalTooltip} animation={{ back: { config: { duration: 300, delay: 200 } }, container: { config: { delay: 200 } } }} />
  )
}

export { TooltipRoot, modalTooltip }
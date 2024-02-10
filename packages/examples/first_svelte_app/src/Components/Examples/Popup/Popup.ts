import { animations } from 'decl-modal'
import { generateModal } from 'decl-modal/svelte'
import Tooltip from './Popup.svelte'

export const TooltipAnimation = animations.mergeAnimations('pop', {
    back: { config: { duration: 200, delay: 200 } },
    container: { config: { delay: 200 } }
})

export const { PopupRootProps, getPopupContext, showPopup } = generateModal({ Modals: { Tooltip }, name: 'Popup' })

// Wrapper method of showMethod to improve its use
export const showMyPopup = (domEvent: Event) => {
    showPopup('Tooltip', {
        target: domEvent.target as HTMLElement,
    })
}
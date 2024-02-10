import { generateModal } from 'decl-modal/svelte'
import Menu from './Menu.svelte'
import type { AnimConfig } from 'decl-modal'

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

export const { MenuRootProps, getMenuContext, showMenu } = generateModal({ name: 'Menu', Modals: { Menu } })
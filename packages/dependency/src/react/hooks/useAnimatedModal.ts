import { DEFAULT_ANIMATIONS, generateAnimations, type AnimConfig } from "@/contants/animations"
import type { ModalFactory } from "@/index"
import { useEffect, useId, useRef, useState } from "react"

type useAnimationProps = {
    animation?: keyof typeof DEFAULT_ANIMATIONS | AnimConfig,
    Component?: any
    waitAnimation?: ReturnType<InstanceType<typeof ModalFactory>['getConfig']>['waitAnimation']
    sendMessage?: any,
}

const useAnimatedModal = <C extends Function>({ animation, closeModal, Component, waitAnimation, sendMessage }: useAnimationProps & { closeModal?: C }) => {

    const animateRef = useRef<{ reverse: () => Promise<void>, refreshAnims: () => void } | null>()
    const [closeIntermediate, setCloseIntermediate] = useState<any>(null)
    const modalId = useId()

    useEffect(() => {
        document.querySelector(`[data-modal-type=back]:not([data-modal-back-id])`)?.setAttribute?.('data-modal-back-id', modalId)
        document.querySelector(`[data-modal-type=container]:not([data-modal-container-id])`)?.setAttribute?.('data-modal-container-id', modalId)
        if (animateRef.current?.refreshAnims) {
            animateRef.current.refreshAnims()
        }
    }, [Component])

    useEffect(() => {
        if (!animation) return

        if (!Component) {
            animateRef.current = null
            return
        }

        if (!animateRef.current) {
            if (typeof animation === 'string') {
                const anim = DEFAULT_ANIMATIONS[animation] as typeof DEFAULT_ANIMATIONS['pop']
                animateRef.current = generateAnimations(anim, modalId)
                return
            }

            animateRef.current = generateAnimations(DEFAULT_ANIMATIONS.pop, modalId, animation)
        }

        if (closeIntermediate !== null) {
            (async () => {
                if (waitAnimation === false) {
                    sendMessage(closeIntermediate)
                }
                if (!animateRef.current) return
                await animateRef.current.reverse()
                closeModal(waitAnimation === false ? false : closeIntermediate)
            })()
        }

    }, [closeIntermediate, Component])

    if (!animation) {
        return {
            closeAnimated: closeModal,
        }
    }


    return {
        closeAnimated: ((args: any) => setCloseIntermediate(args)) as any as C,
    }
}

export { useAnimatedModal }
export type { useAnimationProps }

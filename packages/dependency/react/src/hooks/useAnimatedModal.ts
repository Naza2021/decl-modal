import { type AnimConfig, DEFAULT_ANIMATIONS, generateAnimations }from '@nazfy/modal'
import type { ModalFactory } from "@nazfy/modal"
import { useEffect, useRef, useState } from "react"

type useAnimationProps = {
    animation?: keyof typeof DEFAULT_ANIMATIONS | AnimConfig,
    Component?: any
    waitAnimation?: ReturnType<InstanceType<typeof ModalFactory>['getConfig']>['waitAnimation']
    sendMessage?: any
    modalId: string
}

const useAnimatedModal = <C extends Function>({ animation, closeModal, Component, waitAnimation, sendMessage, modalId }: useAnimationProps & { closeModal?: C }) => {

    const animateRef = useRef<{ reverse: () => Promise<void>, refreshAnims: () => void } | null>()
    const animateCloseRef = useRef<Promise<any> | null>(null)
    const [closeIntermediate, setCloseIntermediate] = useState<any>(null)


    useEffect(() => {
        if (animateRef.current?.refreshAnims) {
            animateRef.current.refreshAnims()
        }
    }, [Component])

    useEffect(() => {
        if (!animation) {
            console.warn('No animation this maybe cause an error')
            return
        }

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

        if (closeIntermediate !== null && !animateCloseRef.current) {
            (async () => {
                if (waitAnimation === false) {
                    sendMessage(closeIntermediate)
                }
                if (!animateRef.current) return
                animateCloseRef.current = animateRef.current.reverse()
                await animateCloseRef.current
                animateCloseRef.current = null
                closeModal(waitAnimation === false ? false : closeIntermediate)
            })()
        }

    }, [closeIntermediate])

    if (!animation) {
        return {
            closeAnimated: closeModal,
            modalId
        }
    }


    return {
        closeAnimated: ((args: any) => setCloseIntermediate(args)) as any as C,
        modalId
    }
}

export { useAnimatedModal }
export type { useAnimationProps }


import type { ModalFactory, ShowConfig } from "@/factorys/modal.factory"
import { throttle, type ModalProps } from ".."

interface animConfig extends KeyframeAnimationOptions {
    reverse?: boolean | ((animatedElement: HTMLElement) => {
        keyframes?: Parameters<Animatable['animate']>[0],
        config?: Omit<animConfig, 'reverse'>
    })
}

export type AnimConfig = {
    back?: {
        keyframes?: Parameters<Animatable['animate']>[0],
        config?: animConfig
        custom?: ((el: HTMLElement) => AnimConfig | Animation)
    },
    container?: {
        keyframes?: Parameters<Animatable['animate']>[0],
        config?: animConfig
        custom?: ((el: HTMLElement) => AnimConfig | Animation)
    }
}

const DEFAULT_ANIMATIONS = {
    bubble: {
        back: {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            config: { duration: 200, fill: 'forwards' }
        },
        container: {
            keyframes: [{ transform: 'scale(1,1)' },
            { transform: 'scale(0.9,1.1)' },
            { transform: 'scale(1.1,0.9)' },
            { transform: 'scale(0.95,1.05)' },
            { transform: 'scale(1,1)' }],
            config: { duration: 300, fill: 'forwards', reverse: false }
        }
    } as AnimConfig,
    pop: {
        back: {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            config: { duration: 200, fill: 'forwards' }
        },
        container: {
            keyframes: {
                transform: ['translateY(60%) scale(0.8)', 'translateY(0%) scale(1)'],
            },
            config: { duration: 250, fill: 'forwards', reverse: false, easing: 'cubic-bezier(.47,1.64,.41,.8)' }
        }
    } as AnimConfig,
    fade: {
        back: {
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            config: { duration: 200, fill: 'forwards' }
        },
        container: {
            keyframes: [{}],
            config: { duration: 200, fill: 'forwards' }
        }
    } as AnimConfig,
}

export const mergeAnimations = (anim1: AnimAvailableConfig, anim2: AnimAvailableConfig): AnimConfig => {

    if (typeof anim1 === 'string') anim1 = (DEFAULT_ANIMATIONS as any)?.[anim1]
    if (typeof anim2 === 'string') anim2 = (DEFAULT_ANIMATIONS as any)?.[anim2]

    return {
        back: {
            keyframes: anim2?.back?.keyframes || anim1.back.keyframes,
            config: { ...anim1.back.config, ...anim2?.back?.config },
            custom: anim2?.back?.custom
        },
        container: {
            keyframes: anim2?.container?.keyframes || anim1.container.keyframes,
            config: { ...anim1.container.config, ...anim2?.container?.config },
            custom: anim2?.container?.custom
        }
    }
}

const generateAnimations = (anim: typeof DEFAULT_ANIMATIONS['fade'], id: string, newMergeAnimation: AnimConfig, { factory, closeModal, sendMessage, waitAnimation, animation }: ModalProps & { factory: ModalFactory } & ShowConfig = {} as any) => {

    if (typeof anim === 'string') anim = (DEFAULT_ANIMATIONS as any)?.[anim]

    const processAnimation = (newMergeAnimation ?? animation) ? mergeAnimations(anim, (newMergeAnimation ?? animation)) : anim

    console.log({ processAnimation, animation })

    const nodes = () => ({
        back: (document.querySelector(`[data-modal-back-id="${id}"]`) as HTMLDivElement),
        container: (document.querySelector(`[data-modal-back-id="${id}"] > *:not([data-modal-type*="zone-"])`) as HTMLDivElement),
    } as const)
    const anims = () => ({
        back: (customAnim?: Function) => {
            const Nodes = nodes()
            if (customAnim || typeof processAnimation?.back?.custom === 'function') {
                const animation = (typeof processAnimation?.back?.custom === 'function' ? processAnimation?.back?.custom : customAnim)(Nodes.back)
                if (animation instanceof Animation) return animation

                const processReverseAnim = mergeAnimations(DEFAULT_ANIMATIONS.fade, { back: animation } || {})
                return Nodes.back?.animate?.(processReverseAnim.back.keyframes, processReverseAnim.back.config)

            }
            return Nodes.back?.animate?.(processAnimation.back.keyframes, processAnimation.back.config)
        },
        container: (customAnim?: Function) => {
            const Nodes = nodes()
            if (customAnim || typeof processAnimation?.container?.custom === 'function') {
                const animation = (typeof processAnimation?.container?.custom === 'function' ? processAnimation?.container?.custom : customAnim)(Nodes.container)
                if (animation instanceof Animation) return animation

                const processReverseAnim = mergeAnimations(DEFAULT_ANIMATIONS.fade, { container: animation } || {})
                return Nodes.container?.animate?.(processReverseAnim.back.keyframes, processReverseAnim.back.config)

            }

            return Nodes.container?.animate?.(processAnimation.container.keyframes, processAnimation.container.config)
        }
    } as const)

    let originAnims = Object.fromEntries(Object.entries(anims()).map(([key, anim]) => [key, anim()]))

    const response = {
        refreshAnims: () => {
            const newAnims = Object.entries(anims()).map(([key, anim]) => {
                if (((processAnimation as any)[key]).config.reverse === false) return Promise.resolve()
                if (!anim) return

                const processsAnim = anim()

                if (!processsAnim) return [key, processsAnim]
                processsAnim.currentTime = (((originAnims as any)[key] as Animation).effect.getComputedTiming().progress * (processAnimation as any)[key].config.duration)

                return [key, processsAnim]
            })

            originAnims = Object.fromEntries(newAnims as any)
        },
        reverse: () => {
            const animsPromises = Object.entries(anims()).map(([key, anim]) => {
                if (((processAnimation as any)[key]).config.reverse === false) return Promise.resolve()
                if (!anim) return

                const customReverseAnim = typeof ((processAnimation as any)[key]).config.reverse === 'function'
                const processsAnim = anim(customReverseAnim ? ((processAnimation as any)[key]).config.reverse : undefined)

                if (!processsAnim) return

                if (customReverseAnim) {
                    return processsAnim.finished
                }

                processsAnim.effect.updateTiming({ direction: 'reverse' })

                const animTime = processsAnim.effect.getTiming().duration as number + (processsAnim.effect.getTiming().delay || 0)

                processsAnim.currentTime = animTime - (((originAnims as any)[key] as Animation).effect.getComputedTiming().progress * animTime)

                return processsAnim.finished
            })
            return Promise.all(animsPromises) as any
        }
    }

    return {
        ...response,
        animatedClose: throttle(async (...args: any[]) => {
            console.log({ factory })
            const config = factory.getConfig()
            if ((waitAnimation ?? config?.waitAnimation) === false) sendMessage(...args as [any])
            await response.reverse()
            closeModal(...args)
        })
    }
}

type AnimAvailableConfig = keyof typeof DEFAULT_ANIMATIONS | AnimConfig

export { DEFAULT_ANIMATIONS, generateAnimations, type AnimAvailableConfig, type AnimConfig }

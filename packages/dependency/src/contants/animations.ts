interface animConfig extends KeyframeAnimationOptions {
    reverse?: boolean
}

type AnimConfig = {
    back?: {
        keyframes?: Parameters<Animatable['animate']>[0],
        config?: animConfig
    },
    container?: {
        keyframes?: Parameters<Animatable['animate']>[0],
        config?: animConfig
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

const mergeAnimations = (anim1: any, anim2: any) => {
    return {
        back: {
            keyframes: anim2?.back?.keyframes || anim1.back.keyframes,
            config: { ...anim1.back.config, ...anim2?.back?.config }
        },
        container: {
            keyframes: anim2?.container?.keyframes || anim1.container.keyframes,
            config: { ...anim1.container.config, ...anim2?.container?.config }
        }
    }
}

const generateAnimations = (anim: typeof DEFAULT_ANIMATIONS['pop'], id: string, newMergeAnimation?: AnimConfig) => {

    const processAnimation = newMergeAnimation ? mergeAnimations(anim, newMergeAnimation) : anim

    const nodes = () => ({
        back: (document.querySelector(`[data-modal-back-id="${id}"]`) as HTMLDivElement),
        container: (document.querySelector(`[data-modal-container-id="${id}"]`) as HTMLDivElement),
    } as const)
    const anims = () => ({
        back: () => nodes().back?.animate?.(processAnimation.back.keyframes, processAnimation.back.config),
        container: () => nodes().container?.animate?.(processAnimation.container.keyframes, processAnimation.container.config)
    } as const)

    let originAnims = Object.fromEntries(Object.entries(anims()).map(([key, anim]) => [key, anim()]))

    return {
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

                const processsAnim = anim()

                if (!processsAnim) return

                processsAnim.effect.updateTiming({ direction: 'reverse' })

                const animTime = (processAnimation as any)[key].config.duration + ((processAnimation as any)[key].config.delay || 0)
                processsAnim.currentTime = animTime - (((originAnims as any)[key] as Animation).effect.getComputedTiming().progress * animTime)

                return processsAnim.finished
            })
            return Promise.all(animsPromises) as any
        }
    }
}

type AnimAvailableConfig = keyof typeof DEFAULT_ANIMATIONS | AnimConfig

export { DEFAULT_ANIMATIONS, generateAnimations, type AnimConfig, type AnimAvailableConfig }
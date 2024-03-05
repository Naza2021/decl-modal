export const throttle = <Y = any, F = (...args: unknown[]) => Promise<void>>(fn: F, awaitingResponse?: Y): F => {
    let awaitingForPromise = false

    return ((...args: any[]) => {
        if (awaitingForPromise) return awaitingResponse as any

        awaitingForPromise = true
        try {
            const response = (fn as any)(...args)
            if (response instanceof Promise) {
                return response.then((res) => {
                    awaitingForPromise = false
                    return res
                }).catch((res) => {
                    awaitingForPromise = false
                    return Promise.reject(res)
                })
            }
            awaitingForPromise = false
            return response as any
        } catch (e: any) {
            awaitingForPromise = false
            return e
        }
    }) as F
}
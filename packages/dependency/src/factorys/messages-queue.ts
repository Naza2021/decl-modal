import { AbortablePromise } from "./abortable-promise"

export class MessagesQueue<T extends any>{
    private bufferMessages: T[] = []
    private waitForPending: ((arg: T) => void)[] = []
    private defaultTimeout: number
    private avoidReject: boolean = false
    constructor(config?: { timeout?: number, avoidReject?: boolean }) {
        this.defaultTimeout = config?.timeout || 999999999
        this.avoidReject = config?.avoidReject || false
    }

    sendMessage(message: T) {
        if (this.waitForPending.length > 0 && this.waitForPending[0]) {
            this.waitForPending[0](message)
            this.waitForPending.splice(0, 1)
            return
        }

        this.bufferMessages.push(message)
    }

    waitFor(config: { timeout: number } = {} as any): AbortablePromise<T> {

        const { timeout = this.defaultTimeout } = config

        if (this.bufferMessages.length > 0 && this.bufferMessages[0]) {
            const message = this.bufferMessages[0]
            this.bufferMessages.splice(0, 1)
            return Promise.resolve(message) as any as AbortablePromise<T>
        }

        return new AbortablePromise((resolve, reject) => {

            const promiseResolver = (args: T) => {
                clearTimeout(timeoutAbort)
                resolve(args)
            }

            const timeoutAbort = setTimeout(() => {

                if (this.waitForPending?.[0]) {
                    this.waitForPending = this.waitForPending.filter(resolver => resolver !== promiseResolver)
                }

                if (this.avoidReject) {
                    resolve()
                    return
                }
                reject('timeout')
            }, timeout)

            this.waitForPending.push(promiseResolver)

        }, this.avoidReject)
    }
}
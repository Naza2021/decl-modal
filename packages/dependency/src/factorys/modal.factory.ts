import type { AnimAvailableConfig } from "@/contants/animations";
import type { ModalProps, ModalTupleType, extractExtendedModalProps, extractResponseExtendedModalProps, modalResponse } from "@/lib-types/ModalInterna.types";
import { Observable } from "@/observable-own";
import React from "react";
import { MessagesQueue } from "./messages-queue";

export type ModalFactoryProps = {
    wait?: boolean
    waitAnimation?: boolean
}

type observableProps = { modalProps?: ModalProps, internalModalId?: string } & Record<string, unknown>

export type ShowConfig = { animation?: AnimAvailableConfig, override?: false } & ModalFactoryProps

export class ModalFactory<P = any, U = Record<string, React.FC<P>>>{

    private Modals: U
    private wait: ModalFactoryProps['wait']
    private waitAnimation: ModalFactoryProps['waitAnimation']
    private observable: Observable<observableProps>
    constructor(props: ModalFactoryProps & { Modals?: U, config?: Partial<Record<keyof U, { animation?: AnimAvailableConfig }>> }) {
        this.Modals = props.Modals
        this.wait = props.wait ?? true
        this.waitAnimation = props.waitAnimation ?? true
        this.observable = Observable.create<observableProps>()
    }

    getConfig() {
        return { waitAnimation: this.waitAnimation, wait: this.wait }
    }

    suscribe(componentCallback: (...[Component, ComponentProps, config]: ModalTupleType<U, ModalProps>) => void) {
        return {
            ...this.observable.subscribe(({ internalModalId, modalProps, config }) => {
                if (internalModalId && !this.Modals?.[internalModalId as keyof typeof this.Modals]) {
                    console.error('Modal not found:', internalModalId)
                }
                componentCallback(this.Modals?.[internalModalId as keyof typeof this.Modals] as any, modalProps as any, config)
            })
        }
    }

    async show<P extends keyof U, R extends extractResponseExtendedModalProps<U[P]>>(internalModalId: P, modalProps?: Omit<extractExtendedModalProps<U[P]>, keyof ModalProps>, config: ShowConfig = {}) {

        const instanceModalId = crypto.randomUUID()
        const modalMessages = new MessagesQueue<R>()
        const clientMessages = new MessagesQueue<R>()

        const { wait } = config

        const closeModal = (response: R = null) => {
            if (response !== null) clientMessages.sendMessage(response)

            if (this.observable.count() === 0) {
                return instanceModalId
            }

            this.observable.next({ config: { uuid: instanceModalId } })
        }

        type updateArgs = Partial<Omit<extractExtendedModalProps<U[P]>, keyof ModalProps>>

        const updateModal = (args: updateArgs = {}) => {
            this.observable.next({ config: { ...config, uuid: instanceModalId, internalModalId }, modalProps: { ...modalProps as any, ...args, closeModal, waitFor: modalMessages.waitFor.bind(modalMessages), sendMessage: clientMessages.sendMessage.bind(clientMessages) }, internalModalId: (internalModalId as string) })
            if (args) modalProps = { ...modalProps as any, ...args as any }
        }

        updateModal()

        if (this.wait && wait === undefined || wait) {
            const response = await clientMessages.waitFor() as R

            return { response, updateModal, waitFor: clientMessages.waitFor.bind(clientMessages), sendMessage: modalMessages.sendMessage.bind(modalMessages) } as any as modalResponse<R, updateArgs>
        }

        return { closeModal, updateModal, waitFor: clientMessages.waitFor.bind(clientMessages), sendMessage: modalMessages.sendMessage.bind(modalMessages), response: undefined } as any as modalResponse<R, updateArgs>

    }

    static generate<T>(Modal: T) {
        const factory = new ModalFactory({ Modals: { internal: Modal } })

        const show = factory.show.bind(factory)
        factory.show = (...args: any) => show('internal', ...args)

        return factory as {
            show: (props?: Omit<extractExtendedModalProps<T>, keyof ModalProps>, config?: ShowConfig) =>
                Promise<modalResponse<extractResponseExtendedModalProps<T>, Omit<extractExtendedModalProps<T>, keyof ModalProps>>>,
            suscribe: ModalFactory<any, { internal: T }>['suscribe']
        }
    }

}

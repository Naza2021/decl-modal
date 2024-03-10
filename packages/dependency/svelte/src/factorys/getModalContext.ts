import type { ModalProps } from "@nazfy/modal"
import { getContext } from "svelte"
import { get, type Readable } from "svelte/store"

export const getModalContext = (): ModalProps & { store: Readable<ModalProps> } => {
    const store = getContext('modal_props_internal') as any

    const getStore = get(store) as any

    if(typeof getStore === 'undefined') return {} as any
    
    const { closeModal, ...otherProps } = getStore

    return {
        ...otherProps, closeModal: (...args: any[]) => (get(store) as any)?.closeModal?.(...args),
        store
    } as any as ModalProps & { store: Readable<ModalProps> }
}
import type { ModalProps } from "@/index"
import { getContext } from "svelte"
import { get, type Readable } from "svelte/store"

export const getModalContext = () => {
    const store = getContext('modal_props_internal') as any

    const { closeModal, ...otherProps } = get(store) as any

    return {
        ...otherProps, closeModal: (...args: any[]) => (get(store) as any)?.closeModal?.(...args),
        store
    } as any as ModalProps & { store: Readable<ModalProps> }
}
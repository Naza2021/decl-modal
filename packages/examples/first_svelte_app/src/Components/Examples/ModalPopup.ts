import { type ModalProps } from "decl-modal";
import { generateModal } from 'decl-modal/svelte';
import { getContext } from "svelte";
import { get, type Readable } from "svelte/store";
import ModalPopup from "./ModalPopup.svelte";

export const { aRootProps, getAContext, showA } = generateModal({ Modals: { ModalPopup }, name: 'a' })

export const getModalContext = () => {
    const store = getContext('modal_props_internal') as any

    const { closeModal, ...otherProps } = get(store) as any

    return {
        ...otherProps, closeModal: (...args: any[]) => (get(store) as any)?.closeModal?.(...args),
        store
    } as any as ModalProps & { store: Readable<ModalProps> }
}
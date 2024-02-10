import { ModalFactory, type ModalProps } from "decl-modal";
import { getContext, type ComponentProps } from "svelte";
import MyfirstModal from "./MyfirstModal.svelte";
import { get, type Readable } from "svelte/store";

type xd = ComponentProps<MyfirstModal>

export const myFactory = new ModalFactory({ Modals: { MyfirstModal: MyfirstModal as any as (props: xd) => any } })
export const myFactory2 = new ModalFactory({ Modals: { MyfirstModal: MyfirstModal as any as (props: xd) => any } })

const generate = () => {
    return {
        devRootProps: '',
        showDev: '',
        getDevContext: ''
    }
}

export const getModalContext = () => {
    const store = getContext('modal_props_internal') as any

    const { closeModal, ...otherProps } = get(store) as any

    return {
        ...otherProps, closeModal: (...args: any[]) => (get(store) as any)?.closeModal?.(...args),
        store
    } as any as ModalProps & { store: Readable<ModalProps> }
}
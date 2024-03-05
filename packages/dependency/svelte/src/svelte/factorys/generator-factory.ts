'use client'
import { ModalFactory, type ModalProps } from "@/index";
import type { ValueOf, extractExtendedModalProps } from '@/lib-types/ModalInterna.types';
import type { Call, Objects } from 'hotscript';
import { getContext, type ComponentConstructorOptions, type SvelteComponent } from 'svelte';
import { get, type Readable } from 'svelte/store';

type convertSvelteToReact<T> = { [K in keyof T]: (props: getSvelteComponent<T[K]>) => void }

type getSvelteComponent<T> = T extends SvelteComponent<infer U> ? U : ConstructorParameters<T> extends [ComponentConstructorOptions<infer Props>] ? Props : never


function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function generateModal<T extends ConstructorParameters<typeof ModalFactory>[0], N extends string>(ModalConfig: T & { name: N }):
    Record<`show${N}`, ModalFactory<any, convertSvelteToReact<T['Modals']>>['show']>
    &
    Record<`${N}RootProps`, { factory: InstanceType<typeof ModalFactory> }
        & Partial<Omit<Call<Objects.Assign<extractExtendedModalProps<ValueOf<convertSvelteToReact<T['Modals']>>>>>, keyof ModalProps>>>
    &
    Record<`get${N}Context`,
        <Y extends keyof T['Modals'] | undefined = undefined, R = Y extends undefined ?
            Partial<Call<Objects.Assign<extractExtendedModalProps<ValueOf<convertSvelteToReact<T['Modals']>>>>>>
            & ModalProps : (extractExtendedModalProps<convertSvelteToReact<T['Modals']>[Y]> & ModalProps) >
            () => R & { store: Readable<R> }> {


    const internalFactory = new ModalFactory(ModalConfig)

    return {
        [`show${ModalConfig.name}`]: internalFactory.show.bind(internalFactory),
        [`${ModalConfig.name}RootProps`]: { factory: internalFactory },
        [`get${ModalConfig.name}Context`]: () => {
            const store = getContext('modal_props_internal') as any

            const { closeModal, ...otherProps } = get(store) as any

            return {
                ...otherProps, closeModal: (...args: any[]) => (get(store) as any)?.closeModal?.(...args),
                store
            } as any as ModalProps & { store: Readable<ModalProps> }
        },
    } as any
}

export { generateModal };


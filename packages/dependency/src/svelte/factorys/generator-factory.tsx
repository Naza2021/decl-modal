'use client'
import type { AnimAvailableConfig } from '@/contants/animations';
import { ModalFactory, type ModalProps } from "@/index";
import type { ValueOf, extractExtendedModalProps } from '@/lib-types/ModalInterna.types';
import type { Call, Objects, Strings } from 'hotscript';
import { type ComponentConstructorOptions, type SvelteComponent } from 'svelte';

type configType<U> = { config?: Partial<Record<keyof U, { animation?: AnimAvailableConfig }>> }

type convertSvelteToReact<T> = { [K in keyof T]: (props: getSvelteComponent<T[K]>) => void }

type getSvelteComponent<T> = T extends SvelteComponent<infer U> ? U : ConstructorParameters<T> extends [ComponentConstructorOptions<infer Props>] ? Props : never

type cKey<N extends any> = Call<Strings.CamelCase, Extract<N, string>>

function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function generateModal<T extends ConstructorParameters<typeof ModalFactory>[0], N extends string>(ModalConfig: T & { name: N }):
    Record<cKey<`show-${N}`>, ModalFactory<any, convertSvelteToReact<T['Modals']>>['show']>
    &
    Record<`${N}RootProps`, { factory: InstanceType<typeof ModalFactory> }
        & Partial<Omit<Call<Objects.Assign<extractExtendedModalProps<ValueOf<convertSvelteToReact<T['Modals']>>>>>, keyof ModalProps>>>
    &
    Record<cKey<`get-${N}Context`>,
        <Y extends keyof T['Modals'] | undefined = undefined>
            () => Y extends undefined ?
            Partial<Call<Objects.Assign<extractExtendedModalProps<ValueOf<convertSvelteToReact<T['Modals']>>>>>>
            & ModalProps : (extractExtendedModalProps<convertSvelteToReact<T['Modals']>[Y]> & ModalProps)>
// [,
// Merge<>
// (args: 
//     & configType<T['Modals']>
//     & { animation?: AnimAvailableConfig })
//     => any]
{


    const internalFactory = new ModalFactory(ModalConfig)

    return {
        [camelize(`show ${ModalConfig.name}`)]: internalFactory.show.bind(internalFactory),
        [camelize(`${ModalConfig.name}RootProps`)]: { factory: internalFactory },
        [camelize(`get ${ModalConfig.name}Context`)]: '',
    } as any
}

export { generateModal };


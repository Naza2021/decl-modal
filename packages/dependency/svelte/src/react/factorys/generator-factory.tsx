'use client'
import type { AnimAvailableConfig } from '@/contants/animations';
import { ModalFactory } from "@/index";
import type { ModalProps, ValueOf, extractExtendedModalProps, modalResponse } from '@/lib-types/ModalInterna.types';
import type { Call, Objects } from 'hotscript';
import React from 'react';
import { ModalRoot } from '../Components/ModalRoot';

type configType<U> = { config?: Partial<Record<keyof U, { animation?: AnimAvailableConfig }>> }

function generateModal<T extends ConstructorParameters<typeof ModalFactory>[0]>(Component: T):
    [ModalFactory<any, T['Modals']>['show'],
        // Merge<>
        (args: Partial<Omit<Call<Objects.Assign<extractExtendedModalProps<ValueOf<T['Modals']>>>>, keyof ModalProps>>
            & configType<T['Modals']>
            & { animation?: AnimAvailableConfig })
            => any]
function generateModal<T extends (...args: any[]) => any>(Component: T):
    [ReturnType<typeof ModalFactory.generate<T>>['show'],
        (args: Partial<Omit<extractExtendedModalProps<T>, keyof ModalProps>>
            & { animation?: AnimAvailableConfig }) => any]
function generateModal<T extends any>(Component: T) {

    if (typeof (Component as any)?.Modals === 'object') {
        const internalFactory = new ModalFactory(Component)

        return [internalFactory.show.bind(internalFactory) as any, (({ animation, config, ...props }: any) => {
            return <ModalRoot modalFactory={internalFactory} state={props} animation={animation} config={config} />
        })] as any
    }

    const internalFactory = ModalFactory.generate(Component)
    return [internalFactory.show.bind(internalFactory) as any, (({ animation, config, ...props }: any) => {
        return <ModalRoot modalFactory={internalFactory} state={props} animation={animation} config={config} />
    })] as any
}

export { generateModal };

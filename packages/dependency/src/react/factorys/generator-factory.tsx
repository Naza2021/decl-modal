import React from 'react'
import { ModalFactory } from "@/index";
import { ModalRoot } from '..';
import type { Merge, ValueOf, extractExtendedModalProps, modalResponse } from '@/lib-types/ModalInterna.types';
import type { AnimAvailableConfig } from '@/contants/animations';

function generateModal<T extends { Modals: any }>(Component: T & { config: Partial<Record<keyof T['Modals'], { animation?: AnimAvailableConfig }>> }):
    [ModalFactory<any, T['Modals']>['show'],
        (args: Partial<Omit<Merge<extractExtendedModalProps<ValueOf<T['Modals']>>>,
            keyof modalResponse>>
            & { animation?: AnimAvailableConfig }) => any]
function generateModal<T extends (...args: any[]) => any>(Component: T):
    [ReturnType<typeof ModalFactory.generate<T>>['show'],
        (args: Partial<Omit<extractExtendedModalProps<T>, keyof modalResponse>>
            & { animation?: AnimAvailableConfig }) => any]
function generateModal<T extends any>(Component: T) {

    if (typeof (Component as any)?.Modals === 'object') {
        const internalFactory = new ModalFactory(Component)

        return [internalFactory.show.bind(internalFactory) as any, (({ animation, ...props }: any) => {
            return <ModalRoot modalFactory={internalFactory} state={props} animation={animation} />
        })] as any
    }

    const internalFactory = ModalFactory.generate(Component)
    return [internalFactory.show.bind(internalFactory) as any, (({ animation, ...props }: any) => {
        return <ModalRoot modalFactory={internalFactory} state={props} animation={animation} />
    })] as any
}

export { generateModal }

import type { ShowConfig } from "@/factorys/modal.factory"
import { ModalFactory } from "@/index"
import React, { useEffect, useState } from "react"

type useModalProps = {
  modalFactory?: InstanceType<typeof ModalFactory<any>> | { suscribe: (...args: any[]) => { unsubscribe: any } }
}

type State = { Component: React.FC, props: any, config: ShowConfig & { uuid: string, internalModalId: string } } | { Component: React.FC, props: any, config: ShowConfig & { uuid: string, internalModalId: string } }[]

const useModal = ({ modalFactory }: useModalProps) => {

  const [state, setState] = useState<State>({ Component: null as any as React.FC, props: {} as any, config: {} as any })

  const stateUpdater = (Component: any, ComponentProps: any, config: any) => {

    // Append new item with override
    if (config.override === false) {
      setState(prev => {
        if (Array.isArray(prev)) {
          return [...prev, { Component: Component, props: ComponentProps, config }]
        }

        if (prev.Component !== null) {
          return [prev, { Component: Component, props: ComponentProps, config }] as any
        }

        return [{ Component: Component, props: ComponentProps, config }]
      })
      return
    }

    // Update state Component or delete Component
    setState(prev => {

      // Delete Component in List
      if (Array.isArray(prev) && !Component && config.uuid) {

        const newState = prev.filter(state => state.config.uuid !== config.uuid)

        if (newState.length === 0) {
          return { Component: null, props: ComponentProps, config } as State
        }

        return newState as any
      }

      return { Component: Component || null, props: ComponentProps, config } as State
    })
  }

  useEffect(() => {
    const { unsubscribe } = modalFactory.suscribe((Component, ComponentProps = {}, config) => {
      const fallBackCloseModal = (...args: any[]) => {
        const fallbackResponse = ComponentProps.closeModal(...args)
        if (fallbackResponse) {
          stateUpdater(undefined, undefined, { config: { uuid: fallbackResponse } })
        }
      }

      stateUpdater(Component, { ...ComponentProps, closeModal: fallBackCloseModal }, config)
    })

    return () => {
      unsubscribe()
    }
  }, [modalFactory])

  return state
}

export { useModal }
export type { useModalProps }





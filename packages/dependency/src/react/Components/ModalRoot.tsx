
'use client'
import type { AnimAvailableConfig } from "@/contants/animations"
import type { ModalProps as modalProps, modalResponse } from "@/lib-types/ModalInterna.types"
import React from "react"
import { createTypedContext } from "../context-creator"
import { useAnimatedModal } from "../hooks/useAnimatedModal"
import { useModal, type useModalProps as ModalProps } from "../hooks/useModal"

export interface ModalRootProps {
  modalFactory?: ModalProps['modalFactory']
  animation?: AnimAvailableConfig
}


type useModalPropsType = <T = unknown>() => (T extends { waitFor: any } ? T : modalProps<T>)

const [useInternal, TypedContextProvider] = createTypedContext<modalResponse>()

const ModalRoot = ({ modalFactory, state, animation, config: RootConfig }: ModalRootProps & { state?: any, config?: any }): ReturnType<React.FC> => {
  const State = useModal({ modalFactory: modalFactory })

  if (!Array.isArray(State) && !State.Component) return null as any

  if (Array.isArray(State)) {
    return <>
      {State.map((InternalState) => {
        const { Component, props, config } = InternalState
        return <InternalRender config={config} modalFactory={modalFactory} key={config.uuid} {...{ ...props, ...state || {}, ...{ Component, animation: config?.animation || RootConfig?.[config.internalModalId]?.animation || animation } }} />
      })}
    </>
  }

  const { Component, props, config } = State

  return <>
    <InternalRender config={config} modalFactory={modalFactory} {...{ ...props, ...state || {}, ...{ Component, animation: config?.animation || RootConfig?.[config.internalModalId]?.animation as any || animation } }} />
  </>
}

const InternalRender: React.FC<any> = ({ Component, animation, modalFactory, config, ...props }) => {
  const { closeAnimated, modalId } = useAnimatedModal({
    animation,
    closeModal: props?.closeModal,
    Component,
    waitAnimation: config?.waitAnimation ?? modalFactory?.getConfig?.()?.waitAnimation,
    sendMessage: props?.sendMessage,
    modalId: config?.uuid
  })

  const RootProps = { 'data-modal-back-id': config?.uuid }

  return (
    <TypedContextProvider value={{ ...{ ...props, ...{ closeModal: closeAnimated, modalId, RootProps } } }}>
      <Component {...{ ...props, ...{ closeModal: closeAnimated, modalId, RootProps } }} />
    </TypedContextProvider>
  )
}


const useModalProps = useInternal as useModalPropsType

export { ModalRoot, useModalProps }


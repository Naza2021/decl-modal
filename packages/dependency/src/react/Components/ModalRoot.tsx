
'use client'
import type { AnimAvailableConfig } from "@/contants/animations"
import React from "react"
import { useAnimatedModal } from "../hooks/useAnimatedModal"
import { useModal, type useModalProps as ModalProps } from "../hooks/useModal"
import { createTypedContext } from "../context-creator"
import type { extractResponseExtendedModalProps, modalResponse } from "@/lib-types/ModalInterna.types"

export interface ModalRootProps {
  modalFactory?: ModalProps['modalFactory']
  animation?: AnimAvailableConfig
}


type useModalPropsType = <T = any>() => modalResponse<extractResponseExtendedModalProps<T>> & Omit<T, keyof modalResponse>

const [useInternal, TypedContextProvider] = createTypedContext<modalResponse>()

const ModalRoot = ({ modalFactory, animation, ...state }: ModalRootProps): ReturnType<React.FC> => {
  const State = useModal({ modalFactory: modalFactory })

  if (!Array.isArray(State) && !State.Component) return null as any

  if (Array.isArray(State)) {
    return <>
      {State.map((InternalState) => {
        const { Component, props, config } = InternalState
        return <InternalRender key={config.uuid} {...{ ...props, ...state || {}, ...{ Component, animation: config?.animation || animation } }} />
      })}
    </>
  }

  const { Component, props, config } = State

  return <>
    <InternalRender {...{ ...props, ...state || {}, ...{ Component, animation: config?.animation || animation } }} />
  </>
}

const InternalRender: React.FC<any> = ({ Component, animation, ...props }) => {
  const { closeAnimated } = useAnimatedModal({ animation, closeModal: props?.closeModal, Component })
  return (
    <TypedContextProvider value={{ ...{ ...props, ...{ closeModal: closeAnimated } } }}>
      <Component {...{ ...props, ...{ closeModal: closeAnimated } }} />
    </TypedContextProvider>
  )
}


const useModalProps = useInternal as useModalPropsType

export { ModalRoot, useModalProps }


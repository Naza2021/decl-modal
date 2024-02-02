import type { ShowConfig } from "@/factorys/modal.factory";
import type { MessagesQueue } from "../factorys/messages-queue";

type MessagesQueueInstance<R = any> = InstanceType<typeof MessagesQueue<R>>

export type modalResponse<R = any, A = any> = {
  updateModal: (args?: A) => void,
  closeModal: (...args: Partial<Parameters<MessagesQueueInstance<R>['sendMessage']>>) => ReturnType<MessagesQueueInstance<R>['sendMessage']>,
  waitFor: MessagesQueueInstance<R>['waitFor'], sendMessage: MessagesQueueInstance<R>['sendMessage'],
  response: R
}

export type ModalTupleType<T, E = {}> = {
  [K in keyof T]: [T[K], GetComponentProps<T[K] & E>, ShowConfig & { uuid?: string }];
}[keyof T];

export type ModalProps<R = any, Props = {}> = Omit<modalResponse<R, Props>, 'response'> & (Props extends Object ? Props : {}) & { modalId: string }

export type StringLiteral<T> = T extends string
  ? string extends T
  ? never
  : T
  : never;

type InternalGetComponentProps<T extends ((...args: any) => {}) | React.FC | any> = T extends React.FC<infer U> ?
  U
  :
  T extends ((...args: infer U) => unknown) ?
  U[0]
  :
  T

export type GetComponentProps<T> = InternalGetComponentProps<T>

export type extractExtendedModalProps<T extends any> = GetComponentProps<T> extends ModalProps<any, infer Y> ? Y : GetComponentProps<T>
export type extractResponseExtendedModalProps<T extends any> = GetComponentProps<T> extends { sendMessage: infer R } ? Parameters<R>[0] : any


export type ValueOf<T> = T[keyof T];
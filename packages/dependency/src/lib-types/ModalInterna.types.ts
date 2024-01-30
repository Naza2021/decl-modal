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

export type ModalProps<R = any, Props = {}> = Omit<modalResponse<R, Props>, 'response'> & (Props extends Object ? Props : {})

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


type CommonKeys<T extends object> = keyof T;
type AllKeys<T> = T extends any ? keyof T : never;
type Subtract<A, C> = A extends C ? never : A;
type NonCommonKeys<T extends object> = Subtract<AllKeys<T>, CommonKeys<T>>;

type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;

type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
  ? PickType<T, K>
  : never;

export type Merge<T extends object> = {
  [k in CommonKeys<T>]: PickTypeOf<T, k>;
} &
  {
    [k in NonCommonKeys<T>]?: PickTypeOf<T, k>;
  };    
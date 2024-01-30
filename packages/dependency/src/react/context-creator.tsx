import React, { createContext, useContext } from 'react';

type ContextProviderProps<T> = {
  value: T;
  children: React.ReactNode;
};

/** @example [useTypedContext, TypedContextProvider]  */
export function createTypedContext<T>() {
  const TypedContext = createContext<T | undefined>(undefined);

  function useTypedContext() {
    const context = useContext(TypedContext);
    return context || {} as T;
  }

  function TypedContextProvider(props: ContextProviderProps<T>) {
    const { value, children } = props;

    return (
      <TypedContext.Provider value={value}>{children}</TypedContext.Provider>
    );
  }

  return [useTypedContext, TypedContextProvider] as const;
}

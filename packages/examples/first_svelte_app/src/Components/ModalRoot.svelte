<script lang="ts">
  import { type ModalFactory, type ModalProps } from "decl-modal";
  import { SvelteComponent, getContext, onMount } from "svelte";
  import AnimatedWrapper from "./AnimatedWrapper.svelte";
  import { get, type Readable } from "svelte/store";

  export const getModalContext = () => {
    const store = getContext("modal_props_internal") as any;

    const { closeModal, ...otherProps } = get(store) as any;

    return {
      ...otherProps,
      closeModal: (...args: any[]) =>
        (get(store) as any)?.closeModal?.(...args),
      store,
    } as any as ModalProps & { store: Readable<ModalProps> };
  };

  let DynamicComponent = {
    Component: null as any as SvelteComponent,
    Props: {} as any,
    Config: {} as any,
  };

  export let factory: InstanceType<typeof ModalFactory>;

  onMount(() => {
    const suscribtion = factory.suscribe((Component, Props, Config) => {
      DynamicComponent = { Component, Props, Config };
    });

    return () => {
      suscribtion.unsubscribe();
    };
  });

  console.log({ factory });

  let RootProps = { "data-modal-back-id": DynamicComponent.Config?.uuid };

  $: RootProps = { "data-modal-back-id": DynamicComponent.Config?.uuid };
</script>

{#if !Array.isArray(DynamicComponent) && DynamicComponent.Component}
  <AnimatedWrapper
    ownThis={DynamicComponent.Component}
    {...DynamicComponent.Props}
    {RootProps}
  />
{/if}

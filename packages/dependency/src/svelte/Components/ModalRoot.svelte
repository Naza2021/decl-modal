<script lang="ts">
  import { get, writable } from "svelte/store";

  import { stateUpdater } from "../../contants/state-updater";
  import { type ModalFactory } from "../../factorys/modal.factory";
  import { SvelteComponent, onMount } from "svelte";
  import AnimatedWrapper from "./AnimatedWrapper.svelte";
  import { type AnimConfig } from "../../contants/animations";

  type T = $$Generic;

  type $$Props = Partial<T> & {
    factory: InstanceType<typeof ModalFactory>;
    animation?: AnimConfig;
  };

  let DynamicComponent = writable({
    Component: null as any as SvelteComponent,
    Props: {} as any,
    Config: {} as any,
  });

  export let factory: InstanceType<typeof ModalFactory>;
  export let animation: AnimConfig;

  onMount(() => {
    const suscribtion = factory.suscribe((Component, Props, Config) => {
      DynamicComponent.set(
        stateUpdater({
          Component,
          Props,
          Config,
          oldState: get(DynamicComponent),
        }),
      );
    });

    return () => {
      suscribtion.unsubscribe();
    };
  });
</script>

{#if Array.isArray($DynamicComponent)}
  {#each $DynamicComponent as $Component ($Component.Config.uuid)}
    <AnimatedWrapper
      {...$$restProps}
      {factory}
      ownThis={$Component.Component}
      {...$Component.Props}
      waitAnimation={$Component.Config?.waitAnimation}
      animation={$Component.Config?.animation ?? animation}
      modalId={$Component.Config?.uuid}
    />
  {/each}
{/if}

{#if !Array.isArray($DynamicComponent) && $DynamicComponent.Component}
  <AnimatedWrapper
    {...$$restProps}
    {factory}
    ownThis={$DynamicComponent.Component}
    {...$DynamicComponent.Props}
    waitAnimation={$DynamicComponent.Config?.waitAnimation}
    animation={$DynamicComponent.Config?.animation ?? animation}
    modalId={$DynamicComponent.Config?.uuid}
  />
{/if}

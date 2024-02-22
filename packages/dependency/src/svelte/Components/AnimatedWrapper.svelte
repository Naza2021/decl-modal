<script lang="ts">
  import * as animations from "../../contants/animations";
  import { onMount, setContext } from "svelte";
  import { readonly, writable } from "svelte/store";

  export let ownThis: any;
  export let factory: any;
  let ownClose = $$restProps?.closeModal;

  let RootProps = { "data-modal-back-id": $$restProps?.modalId };

  let PropsStore = writable({
    ...$$restProps,
    RootProps,
  });

  setContext("modal_props_internal", readonly(PropsStore));

  onMount(() => {
    if (!ownThis) return () => {};

    const { animatedClose } = animations.generateAnimations(
      animations.DEFAULT_ANIMATIONS.fade,
      $$restProps?.modalId,
      undefined as any,
      { ...$$restProps, factory } as any,
    );

    ownClose = animatedClose;
  });

  $: {
    PropsStore.set({
      ...$$restProps,
      closeModal: ownClose,
      RootProps,
    } as any);
  }

  const externalProps = [
    "RootProps",
    "animation",
    "modalId",
    "waitFor",
    "sendMessage",
    "waitAnimation",
    "closeModal",
  ];
</script>

<svelte:component
  this={ownThis}
  {...Object.fromEntries(
    Object.entries($$restProps).filter(([key]) => !externalProps.includes(key)),
  )}
/>

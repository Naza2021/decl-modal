<script lang="ts">
  import { animations } from "decl-modal";
  import { onMount, setContext } from "svelte";
  import { readonly, writable } from "svelte/store";

  export let closeModal: any;
  export let RootProps: any;
  export let ownThis: any;
  let oldClose = closeModal;
  let ownClose: any;
  let closeProcess: boolean = false;
  let PropsStore = writable({
    ...$$props,
    ownThis: undefined,
  });

  setContext("modal_props_internal", readonly(PropsStore));

  onMount(() => {
    if (!ownThis) return () => {};

    const { reverse } = animations.generateAnimations(
      animations.DEFAULT_ANIMATIONS.bubble,
      RootProps?.["data-modal-back-id"]
    );

    ownClose = async () => {
      if (closeProcess) return;
      closeProcess = true;
      await reverse();
      oldClose(false);
      closeProcess = false;
    };
  });

  $: {
    PropsStore.set({
      ...$$props,
      ownThis: undefined,
      closeModal: ownClose,
    } as any);
  }
</script>

<svelte:component this={ownThis} />

<script lang="ts">
  import { getModalContext } from "decl-modal/svelte";

  const { closeModal, RootProps } = getModalContext();
</script>

<div
  class="flex absolute bg-black bg-opacity-70 top-0 bottom-0 w-full"
  on:click={() => closeModal()}
  {...RootProps}
>
  <div class="m-auto" on:click={(e) => e.stopPropagation()}>
    <slot />
  </div>
</div>

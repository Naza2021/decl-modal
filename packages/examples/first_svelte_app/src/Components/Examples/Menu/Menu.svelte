<script lang="ts">
  import { getModalContext } from "decl-modal/svelte";

  const { RootProps, closeModal } = getModalContext();
</script>

<div
  class="flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full"
  on:click={() => closeModal(false)}
  {...RootProps}
>
  <div
    class="h-full ml-auto max-w-full"
    on:click={(e) => {
      e.stopPropagation();
    }}
  >
    <div class="p-12 bg-white flex flex-col h-full w-[25rem]">
      <h1 class="font-bold">Hola desde menu!</h1>
    </div>
  </div>
</div>

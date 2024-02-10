<script lang="ts">
  import { getModalContext } from "./ModalPopup";

  const { store, closeModal, RootProps } = getModalContext();

  export let myProp: "Holi";
</script>

<div
  class="flex absolute bg-black bg-opacity-70 top-0 bottom-0 w-full"
  on:click={() => closeModal()}
  {...RootProps}
>
  <div class="m-auto">
    <div class="p-5 bg-white rounded-md flex flex-col">
      <h1 class="font-bold">Hola!</h1>
    </div>
  </div>
</div>

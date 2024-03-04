<script lang="ts">
  import { getaContext } from "./ModalPopup";
  import ModalPopup from "./ModalPopup.svelte";

  export let exampleInputProp: "test-input";
  const { closeModal } = getaContext();
</script>

<ModalPopup>
  <div class="p-5 bg-white rounded-md flex flex-col">
    <h1 class="font-bold">Input:</h1>
    <input
      class="p-2 font-bold border border-solid border-black rounded-[0.25rem]"
      id="my-modal-input"
    />
    <button
      class="bg-[#281812] rounded-md py-2 px-8 font-bold text-white self-end mt-4"
      on:click={() => {
        closeModal(document.querySelector(`#my-modal-input`).value);
      }}
    >
      Ok
    </button>
  </div>
</ModalPopup>

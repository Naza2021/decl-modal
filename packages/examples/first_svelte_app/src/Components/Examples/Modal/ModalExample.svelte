<script lang="ts">
  import ModalPopup from "./ModalPopup.svelte";

  export let exampleProp: "test-popup";
</script>

<ModalPopup>
  <div class="p-5 bg-white rounded-md flex flex-col">
    <h1 class="font-bold">Hola!</h1>
  </div>
</ModalPopup>

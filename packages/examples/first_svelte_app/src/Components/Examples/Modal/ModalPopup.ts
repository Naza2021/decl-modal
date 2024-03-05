import { generateModal } from "@nazfy/modal-svelte";
import ModalPopup from "./ModalExample.svelte";
import ModalPopuwModalInput from "./ModalInputExample.svelte";

export const { aRootProps, getaContext, showa } = generateModal({
  Modals: { ModalPopup, ModalPopuwModalInput },
  name: "a",
});

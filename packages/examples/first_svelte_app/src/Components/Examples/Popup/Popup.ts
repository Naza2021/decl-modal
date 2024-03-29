import { mergeAnimations } from "@nazfy/modal-svelte";
import { generateModal } from "@nazfy/modal-svelte";
import Tooltip from "./Popup.svelte";

export const TooltipAnimation = mergeAnimations("pop", {
  back: { config: { duration: 200, delay: 200 } },
  container: { config: { delay: 200 } },
});

export const { PopupRootProps, getPopupContext, showPopup } = generateModal({
  Modals: { Tooltip },
  name: "Popup",
});

// Wrapper method of showMethod to improve its use
export const showMyPopup = (domEvent: Event) => {
  showPopup("Tooltip", {
    target: domEvent.target as HTMLElement,
  });
};

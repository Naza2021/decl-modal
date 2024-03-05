import { animations } from "@nazfy/modal";
import { generateModal } from "@nazfy/modal/svelte";
import Tooltip from "./Tooltip.svelte";

export const TooltipAnimation = animations.mergeAnimations("pop", {
  back: { config: { duration: 200, delay: 200 } },
  container: { config: { delay: 200 } },
});

export const {
  TooltipRootProps,
  getTooltipContext,
  showTooltip,
} = generateModal({ Modals: { Tooltip }, name: "Tooltip" });

// Wrapper method of showMethod to improve its use
export const showMyTooltip = (e: Event, content: string) => {
  showTooltip("Tooltip", { target: e.target as HTMLElement, content });
};

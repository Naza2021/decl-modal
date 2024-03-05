import { animations } from "@nazfy/modal";
import Toast from "./Toast.svelte";
import { generateModal } from "@nazfy/modal/svelte";
import type { ComponentProps } from "svelte";

export const ToastAnimation = animations.mergeAnimations("pop", {
  back: {
    config: {
      reverse: (parentElement) => {
        Object.assign(parentElement.style, { overflow: "hidden" });

        parentElement.animate(
          {
            opacity: [1, 0],
          },
          { duration: 150, fill: "forwards" }
        );

        return {
          keyframes: {
            maxHeight: [`${parentElement?.offsetHeight}px`, "0px"],
            paddingTop: [`${parentElement.style.paddingTop}px`, "0px"],
          },
          config: { duration: 300, delay: 150 },
        };
      },
    },
  },
});

export const {
  ToastRootProps,
  getToastContext,
  showToast: internalShow,
} = generateModal({ Modals: { Toast }, name: "Toast" });

type ToastProps = ComponentProps<Toast>;

export const showToast = (
  msg: ToastProps["content"],
  config: Omit<ToastProps, "content"> = { timeout: 3000 }
) => {
  return internalShow(
    "Toast",
    { content: msg, ...config },
    { override: false }
  );
};

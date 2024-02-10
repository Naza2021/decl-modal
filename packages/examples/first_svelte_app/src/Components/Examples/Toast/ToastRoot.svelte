<script>
  import ModalRoot from "../../ModalRoot.svelte";
  import { ToastAnimation, ToastRootProps } from "./Toast";
</script>

<div
  class="flex flex-col justify-center fixed left-1/2 -translate-x-1/2 top-0 transition-all duration-300"
>
  <ModalRoot {...ToastRootProps} animation={ToastAnimation} {...$$restProps} />
</div>

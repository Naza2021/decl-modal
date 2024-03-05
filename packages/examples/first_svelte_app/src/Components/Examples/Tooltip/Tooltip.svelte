<script lang="ts">
  import { onTooltip, getModalContext } from "@nazfy/modal/svelte";
  export let target: HTMLElement;
  export let content: string;
  const { RootProps } = getModalContext();

  const { coords } = onTooltip({
    target,
    pointTarget: "t",
    pointContainer: "b",
    containerOffsets: 10,
  });
</script>

<div
  class="fixed pointer-events-none opacity-0"
  style:top={`${$coords.y}px`}
  style:left={`${$coords.x}px`}
  {...RootProps}
>
  <div>
    <div
      class="p-2 rounded-md bg-white font-bold text-xs break-keep whitespace-nowrap"
    >
      {content}
    </div>
  </div>
</div>

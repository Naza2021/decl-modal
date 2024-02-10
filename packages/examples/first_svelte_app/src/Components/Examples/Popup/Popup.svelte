<script lang="ts">
  import { onTooltip, getModalContext } from "decl-modal/svelte";
  export let target: HTMLElement;
  const { RootProps } = getModalContext();

  const { coords } = onTooltip({
    target,
    zoneOutOffsets: true,
    containerOffsets: 20,
    pointTarget: "b",
    pointContainer: "t",
  });
</script>

<div
  class="fixed opacity-0"
  style:top={`${$coords.y}px`}
  style:left={`${$coords.x}px`}
  {...RootProps}
>
  <div>
    <div
      class="p-2 rounded-md bg-white font-bold text-xs break-keep whitespace-nowrap"
    >
      <div
        class="p-4 rounded-md bg-white font-bold text-xs break-keep whitespace-nowrap"
      >
        <button
          class="bg-black rounded-md py-2 px-4 font-bold text-white active:bg-[#464646]"
        >
          Button
        </button>
      </div>
    </div>
  </div>
</div>

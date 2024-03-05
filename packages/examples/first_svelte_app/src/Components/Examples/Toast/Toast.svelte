<script lang="ts">
  import { getModalContext } from "@nazfy/modal/svelte";
  import { onMount } from "svelte";

  let loading: HTMLDivElement;
  export let timeout: number | null = 3000;
  export let content: string;

  onMount(() => {
    if (!timeout) return;

    loading?.animate(
      {
        transform: ["scaleX(100%)", "scaleX(0%)"],
      },
      { duration: timeout, fill: "forwards" }
    );

    const time = setTimeout(() => {
      closeModal();
    }, timeout);

    return () => {
      clearTimeout(time);
    };
  });

  const { RootProps, closeModal } = getModalContext();
</script>

<div class="pt-6" {...RootProps}>
  <div
    class="bg-white flex flex-col h-auto min-w-max w-[12.5rem] rounded-md cursor-pointer overflow-hidden"
    on:click={() => closeModal()}
  >
    <h1 class="font-bold p-5">{content}</h1>
    {#if timeout}
      <div
        class="h-[6px] bg-[#FE5116] w-full origin-left"
        bind:this={loading}
      />
    {/if}
  </div>
</div>

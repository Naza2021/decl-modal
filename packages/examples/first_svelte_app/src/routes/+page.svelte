<script lang="ts">
  import { onMount, setContext } from "svelte";
  import ModalRoot from "../Components/ModalRoot.svelte";
  import { aRootProps, showA } from "../Components/Examples/ModalPopup";

  let input = "";

  onMount(() => {
    document
      .querySelector(`#xd`)
      ?.animate(
        { backgroundColor: ["#fff", "#000"] },
        { direction: "alternate", duration: 1000, iterations: Infinity }
      );
  });

  (() => {
    setContext("internal", "tu mama");
    // root.$destroy();
  })();
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-gradient-to-bl from-[#ff590a] to-[#ee3b00] h-full w-full flex">
  <div class="m-auto flex flex-col gap-4 items-center">
    <div class="flex gap-12 items-center">
      <button class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white">
        Popup
      </button>
      <button class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white">
        Menu
      </button>
    </div>
    <div class="flex gap-12 items-center mt-6">
      <button
        class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white"
        on:click={() => showA("ModalPopup", { myProp: "Holi" })}
      >
        Modal
      </button>
      <p class="text-white select-none">Tooltip | Popup</p>
      <button
        class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white"
        onClick={async () => {
          // const { response } = await showInputModal(
          //   "TestComponent2",
          //   { myProp: "holi" },
          //   { animation: "pop", waitAnimation: false }
          // );
          // if (typeof response === "string") setinput(response);
        }}
      >
        Input
      </button>
    </div>
    {#if input}
      <p
        class="text-white select-none cursor-pointer max-w-[10rem] text-ellipsis overflow-hidden text-center text-nowrap break-keep"
      >
        Input: {input}
      </p>
    {/if}
  </div>
</div>

<ModalRoot {...aRootProps} />

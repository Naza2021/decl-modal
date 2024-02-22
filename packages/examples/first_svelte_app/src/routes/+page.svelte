<script lang="ts">
  import {
    MenuAnimation,
    MenuRootProps,
    showMenu,
  } from "../Components/Examples/Menu/Menu";
  import { aRootProps, showa } from "../Components/Examples/Modal/ModalPopup";
  import {
    PopupRootProps,
    showMyPopup,
  } from "../Components/Examples/Popup/Popup";
  import { showToast } from "../Components/Examples/Toast/Toast";
  import ToastRoot from "../Components/Examples/Toast/ToastRoot.svelte";
  import {
    TooltipAnimation,
    TooltipRootProps,
    showMyTooltip,
  } from "../Components/Examples/Tooltip/Tooltip";
  import { ModalRoot } from "decl-modal/svelte";

  let input = "";

  const onShowInput = async () => {
    const { response } = await showa(
      "ModalPopuwModalInput",
      { exampleInputProp: "test-input" },
      { waitAnimation: false, animation: "pop" }
    );
    if (typeof response === "string") input = response;
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-gradient-to-bl from-[#ff590a] to-[#ee3b00] h-full w-full flex">
  <div class="m-auto flex flex-col gap-4 items-center">
    <div class="flex gap-12 items-center">
      <button
        class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white"
        on:click={(e) => showMyPopup(e)}
      >
        Popup
      </button>
      <button
        class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white"
        on:click={() => showMenu("Menu")}
      >
        Menu
      </button>
    </div>
    <div class="flex gap-12 items-center mt-6">
      <button
        class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white"
        on:click={() => showa("ModalPopup", { exampleProp: "test-popup" })}
      >
        Modal
      </button>
      <p
        class="text-white select-none"
        on:mouseenter={(e) => showMyTooltip(e, "Svelte")}
      >
        Tooltip | Popup
      </p>
      <button
        class="bg-[#2e0804] rounded-md py-2 px-4 font-bold text-white"
        on:click={onShowInput}
      >
        Input
      </button>
    </div>
    {#if input}
      <p
        class="text-white select-none cursor-pointer max-w-[10rem] text-ellipsis overflow-hidden text-center text-nowrap break-keep"
        on:click={() => showToast(input)}
      >
        Input: {input}
      </p>
    {/if}
  </div>
</div>

<ModalRoot {...aRootProps} animation="bubble" />
<ModalRoot {...TooltipRootProps} animation={TooltipAnimation} />
<ModalRoot {...PopupRootProps} animation="pop" />
<ModalRoot {...MenuRootProps} animation={MenuAnimation} />
<ToastRoot />

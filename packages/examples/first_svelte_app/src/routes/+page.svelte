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
  import { ModalRoot } from "@nazfy/modal/svelte";

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
  <title>Svelte Example Nazfy Modal</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-[#281812] h-full w-full flex">
  <div class="m-auto flex flex-col gap-4 items-center">
    <img
      class="size-[5rem] mb-4 border-white rounded-full border-2 p-3"
      src="/svelte.svg"
    />
    <div class="flex gap-12 items-center">
      <button
        class="bg-[#FE5116] rounded-md py-2 px-4 font-bold text-white"
        on:click={(e) => showMyPopup(e)}
        data-testid="popup"
      >
        Popup
      </button>
      <button
        class="bg-[#FE5116] rounded-md py-2 px-4 font-bold text-white"
        on:click={() => showMenu("Menu")}
        data-testid="menu"
      >
        Menu
      </button>
    </div>
    <div class="flex gap-12 items-center mt-6">
      <button
        class="bg-[#FE5116] rounded-md py-2 px-4 font-bold text-white"
        on:click={() => showa("ModalPopup", { exampleProp: "test-popup" })}
        data-testid="modal"
      >
        Modal
      </button>
      <p
        class="text-white select-none"
        on:mouseenter={(e) => showMyTooltip(e, "Svelte")}
        data-testid="tooltip"
      >
        Tooltip | Popup
      </p>
      <button
        class="bg-[#FE5116] rounded-md py-2 px-4 font-bold text-white"
        on:click={onShowInput}
        data-testid="input"
      >
        Input
      </button>
    </div>
    {#if input}
      <p
        class="text-white select-none cursor-pointer max-w-[10rem] text-ellipsis overflow-hidden text-center text-nowrap break-keep"
        on:click={() => showToast(input)}
        data-testid="toast"
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

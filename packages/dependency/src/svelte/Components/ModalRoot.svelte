<script lang="ts">
  import { SvelteComponent, onMount } from "svelte";
  let DynamicComponent: SvelteComponent;
  let DynamicProps: any;
  export let factory: any;

  onMount(() => {
    const suscribtion = factory.suscribe((Component, props) => {
      DynamicComponent = Component as any;
      DynamicProps = props;
    });

    return () => {
      suscribtion.unsubscribe();
    };
  });
</script>

<svelte:component this={DynamicComponent} {...DynamicProps} />

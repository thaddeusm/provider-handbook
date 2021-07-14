<script>
    import { router } from 'tinro';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    $: {
        if ($router.hash.length < 1) {
            window.scrollTo(0, 0);
        }
    }
</script>

{#key $router.path}
    <div transition:fade|local="{{ duration: 50}}">
        <slot></slot>
    </div>
{/key}

<style>
	div {
		height: 100%;
	}
</style>
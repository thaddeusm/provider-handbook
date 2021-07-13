<script>
    import { router } from 'tinro';
    import { fade } from 'svelte/transition';
</script>

{#key $router.path}
    <div transition:fade|local="{{ duration: 100}}">
        <slot></slot>
    </div>
{/key}

<style>
	div {
		height: 100%;
	}
</style>
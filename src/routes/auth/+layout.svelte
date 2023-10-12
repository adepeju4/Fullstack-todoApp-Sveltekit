<script lang="ts">
    import ShootingStars from "../../Components/ShootingStars.svelte";
  </script>

  <header class="auth--header">
    A super simple todo app.
    <ShootingStars />
  </header>
  <main class="auth--main">
    <slot />
  </main>

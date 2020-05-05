<template>
  <div class="footer">
    &copy; Copyright {{ year }} by mei
    <br>無商業用途
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

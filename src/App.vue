<template>
  <div id="app" class="layoutWrap">
    <Navbar/>
    <router-view class="main p-4"/>
    <Footer/>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
<style lang="scss">
@import "./assets/all";
</style>

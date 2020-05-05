<template>
  <div class="header-navbar">
    <div class="container">
      <router-link to="/">
        <i class="fa fa-home" aria-hidden="true"></i>
        <span class="link-text">首頁</span>
      </router-link>
      <router-link to="/collect">
        <i class="fa fa-gratipay" aria-hidden="true"></i>
        <span class="link-text">收藏</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

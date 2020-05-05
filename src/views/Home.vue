<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 item mb-3"
        v-for="video in videoItems" :key="video.id">
          <div class="card h-100 border-0 cover" ref="cardItem">
            <img :src="video.snippet.thumbnails.high.url" class="card-img-top" alt="videoImage"
            @click="playVideo(video.contentDetails.videoId)" :class="{imgInitHeight:imgInitHeight}">
            <div class="card-body">
              <h5 class="card-title">{{ video.snippet.title.substr(0, 25) }} ...</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      imgInitHeight: true,
    };
  },
  computed: {
    videoItems() {
      return this.$store.state.videoItems;
    },
  },
  methods: {
    playVideo(id) {
      this.$router.push(`/play-video/${id}`);
    },
    scrollHandler(num) {
      // 初始預設高度，網頁觸發滾動事件，height改為auto
      if (num !== 1) {
        this.imgInitHeight = false;
      }
      // eslint-disable-next-line prefer-const
      let windowTop = window.scrollY;
      // eslint-disable-next-line prefer-const
      let windowBottom = windowTop + window.innerHeight;
      this.$refs.cardItem.forEach((item) => {
        // eslint-disable-next-line max-len
        const elMiddle = item.getBoundingClientRect().top + windowTop + item.getBoundingClientRect().height / 2;
        if (windowBottom > elMiddle) {
          item.classList.remove('cover');
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch('getPlayListItems');
    window.addEventListener('scroll', this.scrollHandler);
  },
  updated() {
    this.scrollHandler(1);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
};
</script>

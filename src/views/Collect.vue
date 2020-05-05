<template>
  <div class="collect">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 item mb-3"
        v-for="video in collectItems" :key="video.id">
          <div class="card h-100 border-0">
            <img :src="video.snippet.thumbnails.high.url" class="card-img-top" alt="videoImage"
            @click="playVideo(video.contentDetails.videoId)">
            <div class="card-body">
              <h5 class="card-title">{{ video.snippet.title.substr(0, 25) }} ...</h5>
            </div>
            <button type="button" class="btn btn-sm btn-danger align-self-end"
            @click="removeCollect(video.contentDetails.videoId)">收藏項目</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collect',
  data() {
    return {
      collectItemId: JSON.parse(localStorage.getItem('CollectItemId')) || [],
    };
  },
  computed: {
    collectItems() {
      let videoItems = [];
      videoItems = this.$store.state.videoItems;
      // eslint-disable-next-line max-len
      return videoItems.filter((video) => this.collectItemId.indexOf(video.contentDetails.videoId) !== -1);
    },
  },
  methods: {
    playVideo(id) {
      this.$router.push(`/play-video/${id}`);
    },
    removeCollect(id) {
      this.collectItemId.splice(this.collectItemId.indexOf(id), 1);
      localStorage.setItem('CollectItemId', JSON.stringify(this.collectItemId));
    },
  },
};
</script>

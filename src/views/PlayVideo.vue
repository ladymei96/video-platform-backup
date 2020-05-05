<template>
  <div class="playVideo">
    <div class="container">
      <div class="row no-gutters">
        <div class="col-12 text-center">
          <iframe class="videoWrap" :src="`https://www.youtube.com/embed/${videoId}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <h2 v-if="videoItem.snippet">{{ videoItem.snippet.title }}</h2>
          <span v-if="videoItem.snippet">
            首播日期：{{ publishedAt.year }}月{{ publishedAt.month }}月{{ publishedAt.date }}日
          </span>
          <button type="button" class="btn" :class="isSub" @click="judgeItem">
            <span v-if="isSub === 'btn-danger'">已</span>
            <span v-else>未</span>收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayVideo',
  data() {
    return {
      videoId: '',
      collectItemId: JSON.parse(localStorage.getItem('CollectItemId')) || [],
    };
  },
  computed: {
    videoItem() {
      return this.$store.state.videoItem;
    },
    publishedAt() {
      const timeString = Date.parse(this.videoItem.snippet.publishedAt);
      const date = new Date(timeString);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
      };
    },
    isSub() {
      return this.collectItemId.indexOf(this.videoId) !== -1 ? 'btn-danger' : 'btn-outline-danger';
    },
  },
  watch: {
    videoId() {
      this.$store.dispatch('getVideo', this.videoId);
    },
  },
  methods: {
    judgeItem() {
      if (this.collectItemId.indexOf(this.videoId) === -1) {
        this.collectItemId.push(this.videoId);
      } else {
        this.collectItemId.splice(this.collectItemId.indexOf(this.videoId), 1);
      }
      localStorage.setItem('CollectItemId', JSON.stringify(this.collectItemId));
    },
  },
  created() {
    this.videoId = this.$route.params.videoId;
  },
};
</script>

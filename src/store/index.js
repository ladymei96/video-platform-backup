import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videoItems: [],
    videoItem: {},
    isLoading: false,
  },
  mutations: {
    VIDEOITEMS(state, items) {
      state.videoItems = items;
    },
    VIDEOITEM(state, item) {
      state.videoItem = item;
    },
    LOADING(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    // 把資料取回來-1.取得頻道上傳id 2.取得頻道影片清單 3.取得50部影片
    getPlayListItems(context) {
      context.commit('LOADING', true);
      const channelPlaylistUrl = `${process.env.VUE_APP_URL}channels?part=contentDetails&id=UC27M3BS9uxhJfPjYYys7y8w&key=${process.env.VUE_APP_API}`;
      axios.get(channelPlaylistUrl).then((res) => {
        // eslint-disable-next-line prefer-destructuring
        const uploads = res.data.items[0].contentDetails.relatedPlaylists.uploads;
        const playlistUrl = `${process.env.VUE_APP_URL}playlistItems?part=snippet,contentDetails&playlistId=${uploads}&key=${process.env.VUE_APP_API}&maxResults=50`;
        return axios.get(playlistUrl);
      }).then((result) => {
        context.commit('VIDEOITEMS', result.data.items);
        context.commit('LOADING', false);
      });
    },
    getVideo(context, videoId) {
      context.commit('LOADING', true);
      const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.VUE_APP_API}&part=snippet,contentDetails`;
      axios.get(url).then((res) => {
        context.commit('VIDEOITEM', res.data.items[0]);
        context.commit('LOADING', false);
      }).catch((err) => console.log(err));
    },
  },
  modules: {
  },
});

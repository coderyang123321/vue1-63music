<template>
  <div>
    <Banner :banner="banner"></Banner>
    <Personalized
      :personalized="personalized"
      :title="'推荐歌单'"
    ></Personalized>
    <Personalized :personalized="newAlbum" :title="'最新专辑'"></Personalized>
    <SongList :newsong="newsong" :title="'最新音乐'"></SongList>
  </div>
</template>
<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
} from "@/api/index.js";
import Banner from "@/components/Banner";
import Personalized from "@/components/Personalized";
import SongList from "@/components/SongList";
export default {
  components: {
    Banner,
    Personalized,
    SongList,
  },
  data() {
    return {
      banner: [],
      personalized: [], //推荐歌单
      newAlbum: [], // 最新专辑
      newsong: [],
    };
  },
  created() {
    getBanner({ type: 2 })
      .then((res) => {
        this.banner = res.banners;
      })
      .catch((err) => {
        console.log(err);
      });
    //推荐
    getPersonalized({ limit: 6 }).then((res) => {
      this.personalized = res.result;
    });
    // 专辑
    getNewAlbum().then((res) => {
      this.newAlbum = res.albums.splice(0, 6); // 删除前面6个
    });
    getNewSong().then((res) => {
      this.newsong = res.result;
      console.log(res);
    });
  },
};
</script>
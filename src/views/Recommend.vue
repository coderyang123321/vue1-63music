<template>
  <div class="recommend">
    <!-- iscroll 三层结构 -->
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banner="banner"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            :type="'personalized'"
            @toDetail="toDetail"
          ></Personalized>
          <Personalized
            :personalized="newAlbum"
            :title="'最新专辑'"
            :type="'album'"
            @toDetail="toDetail"
          ></Personalized>
          <SongList :newsong="newsong" :title="'最新音乐'"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
} from "@/api/index.js";
import Banner from "@/components/Recommend/Banner";
import Personalized from "@/components/Recommend/Personalized";
import SongList from "@/components/Recommend/SongList";
import ScrollView from "@/components/ScrollView";
export default {
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  data() {
    return {
      banner: [],
      personalized: [], //推荐歌单
      newAlbum: [], // 最新专辑
      newsong: [],
    };
  },
  methods: {
    toDetail(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`,
      });
    },
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
      let list = [];
      res.result.forEach((item) => {
        if (item.id) {
          let obj = {};
          obj.name = item.name;
          obj.id = item.id;
          obj.picUrl = item.song.album.picUrl;
          let singer = "";
          for (let i = 0; i < item.song["artists"].length; i++) {
            if (i == 0) {
              singer = item.song["artists"][i].name;
            } else {
              singer += "-" + item.song["artists"][i].name;
            }
          }
          obj.singer = singer;
          list.push(obj);
        }
      });
      this.newsong = list;
    });
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  .recommend-wrapper {
    // 这里能解决ios手机上滚动的时候头部不显示的问题//让滚动的时候超出的部分不显示,就不会盖住header 和 tabber
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-enter-to {
  transform: translateX(0);
}
.v-leave {
  transform: translateX(0);
}
.v-leave-active {
  transition: transform 1s;
}
.v-leave-to {
  transform: translateX(100%);
}
</style>
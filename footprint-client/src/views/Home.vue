<template>
  <div class="home">
    <myheader></myheader>
      <carousel></carousel>
      <search></search>
      <searchpic></searchpic>
      <detail></detail>
      <myfooter></myfooter>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Myheader from '../components/sfq/Myheader'
import Carousel1 from './zxm/Carousel'
import Search from './search/Search'
import SearchPic from './lww/SearchPic'
import Myfooter from './zxm/Myfooter'
import Detail from './lww/Detail'
export default {
  name: "home",
  components: {
    'myheader':Myheader,
    'carousel':Carousel1,
    'search':Search,
    'searchpic':SearchPic,
    'myfooter':Myfooter,
    'detail':Detail,
  }
};
</script>

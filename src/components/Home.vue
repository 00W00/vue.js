<template>
  <div>
    <search
    @on-result-click="resultClick"
    @on-change="getResult"
    :results="results"
    @on-submit="onSubmit"
    position="absolute" ref="search" slot="header"></search>
    <!-- 广告 -->
     <swiper loop auto :list="advert_list"></swiper>
     <!-- 分类 -->
     <grid>
       <grid-item label="Grid" v-for="i in 4">
         <img slot="icon" src="../assets/1.jpg">
       </grid-item>
     </grid>
     <!-- 商品列表 -->
     <scroller lock-x scrollbar-y
     @on-scroll-bottom="onScrollBottom"
     ref="scrollerBottom"
     :scroll-bottom-offst="200">
     <div class="">
       <ul>
         <li v-for="cmdy in cmdy_list">
           <card>
             <img slot="header" :src="cmdy.user.headPic" class="head_pic"/>
             <div slot="content" class="card-padding">
               <p>{{cmdy.user.name}}</p>
               <scroller lock-y :scrollbar-x=false :bounce=false>
                 <div class="box1">
                   <div class="box1-item" v-for="img in cmdy.images"><img :src="img.img"></div>
                 </div>
               </scroller>
               <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
               <p style="font-size:14px;line-height:1.2;">{{cmdy.desc}}</p>
             </div>
           </card>
         </li>
       </ul>
       <load-more tip="loading"></load-more>
     </div>
   </scroller>
  </div>
</template>

<script>
import {XHeader, Swiper, Search, Divider, Grid, GridItem, Card, Scroller, LoadMore} from 'vux'
import qs from 'qs'
export default {
  data () {
    return {
      start: 0,
      end: 5,
      advert_list: [],
      onFetching: false,
      cmdy_list: [],
      results: []
    }
  },
  created () {
    this.loadAdvert()
    this.loadCommodity()
  },
  components: {
    Search,
    Swiper,
    XHeader,
    Divider,
    Grid,
    GridItem,
    Card,
    Scroller,
    LoadMore
  },
  methods: {
    onScrollBottom () {
      if (this.onFetching) {
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.loadCommodity()
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
      }
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    loadAdvert () {
      this.$ajax.get('http://172.18.1.12:8080/RestfulDemo/advert_list')
                   .then((response) => {
                     this.advert_list = response.data
                   }).catch(function (response) {
                     console.log(response)
                   })
    },
    loadCommodity () {
      this.$ajax.post('http://172.18.1.12:8080/RestfulDemo/cmdy_list',
                  qs.stringify({start: this.start, end: this.end}))
                      .then((response) => {
                        this.cmdy_list = [...this.cmdy_list, ...response.data]
                        this.start = this.start + response.data.length
                        this.end = this.end + response.data.length
                      })
                      .catch(function (error) {
                        console.log(error)
                      })
    }
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>
<style>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item img{
  width: 200px;
  height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.head_pic{
 float:left;
 height: 2rem;
 width: 2rem;
 border-radius: 2rem;
 margin-top: .5rem;
}
ul{
  padding-left: 0px;
}
li{
  list-style-type: none;
}
a {
  background: transparent;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  color: #0088cc;
}
a:active {
  outline: 0;
}
p{
  text-align: left;
}
</style>

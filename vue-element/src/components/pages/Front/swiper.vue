<template>

<!-- 轮播 -->
    <div class="'swiper-container filmswiper"> 
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 分页器 -->
        <div class="swiper-paginaton"></div>
    </div>

</template>
<script>
import Swiper from 'swiper'//js
import 'swiper/css/swiper.min.css'
export default {
    //生命周期
  mounted(){
    //   console.log("swiper-mouted")
      new Swiper('.filmswiper',{
          loop:true,
          autoplay:{
              delay:2000
              },
          pagination:{
              el:'.swiper-pagination'
          }
      })
  }
}
</script>
<style scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
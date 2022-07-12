<template>
<div class="card" >
  <h1 style="margin:5% 0 5% 0; font-size:37px; font-weight:700">Меню #<span>{{menu.id}}</span></h1>
  <p style="color:#888; text-align:right; font-size:18px; margin-right:8%;">Дата: <span></span>{{ (new Date(menu.date)).toLocaleDateString() }}<span></span></p>
  <div v-for="item,ind in menu.links"> 
    <h2 style="margin:5% 0 5% 0; font-size:32px">{{ item.name }}</h2>
    <div class="container">
      <div style="margin-bottom:5%" v-for="itemDish in item.dishes">
      <hr>
      <div class="row">
        <div class="col-lg-4 col-sx-12 col-sm-12 col-md-4">
            <div class= "circle-image" style="margin-bottom:5%">
              <img :src="srcImg(itemDish.image)"/>
            </div>
          </div>
          <div class="col-lg-8 col-sx-12 col-sm-12 col-md-8">
            <div class="row" style="text-align:left">
              <div class="col-6">
                <p style="margin-bottom:2px">{{ itemDish.name }}</p>
                <p style="color:#999;">{{ itemDish.description }}</p>
              </div>
              <div class="col-3">
                <p>{{ itemDish.weight }}<span> гр.</span></p>
              </div>
              <div class="col-3">
                <strong>{{ itemDish.price }}<span> р.</span></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div style="margin-top:5%">
    <button class="btn btn-outline-danger" @click="delMenu">Удалить</button>
  </div>
  
</div>
</template>

<script>
import {API_URL} from "@/scripts/configAPI.js"
export default {
  name: 'Menu',
  components: {

  },
  methods:{
    srcImg(image){
      return API_URL+'/'+image
    },
    delMenu(){
      this.$emit('delete-menu',this.menu.id)
    }
  },
  props:[
    'menu',
  ],
}
</script>

<style>
.circle-image{
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    width: 150px;
    height: 150px;
}
.circle-image img{
    width:100%;
    height:100%;
    object-fit: cover;
}
</style>
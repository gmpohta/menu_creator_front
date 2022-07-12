<template>
<div>
  <h2 style="margin-bottom:5%">Список меню</h2>
  <div v-if="loadingStatus">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
  </div>
  <div v-else>
    <div style="margin-bottom:5%;">
      <router-link
        style="color:green; font-size:18px"
        to="/create-menu"
        exact
      >+ Добавить...</router-link>
    </div>

    <div v-if="menuList.length">
      <Menu 
        v-for="item in menuList"
        :menu="item"
        style="border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius:8px;"
        @delete-menu="delMenu"
      />
    </div>
    <p v-else style="color:rgba(0,0,0,0.5);font-size:20px">Нет ни одного меню</p>
  </div>
</div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import createMenu from '@/scripts/createMenu.js'

export default {
  name: 'MenuList',
  components:{
    Menu
  },
  methods:{
    delMenu(menuId){
      this.loadingStatus=true
      createMenu.delMenu(menuId)
      .then(res=>{
        const ind=this.menuList.findIndex(el=>el.id===menuId)
        this.menuList.splice(ind,1)
        this.loadingStatus=false
      })
      .catch(err=>{
        console.log(err)
        this.loadingStatus=false
      })
    },
  },
  data(){
    return{
      menuList:[],
      loadingStatus:false,
    }
  },
  mounted(){
    this.loadingStatus=true
    createMenu.getAllMenus()
    .then(res=>{
      this.menuList=res.data
      this.loadingStatus=false
    })
    .catch(err=>{
      if (!err.code=='ERR_NETWORK'){
        this.loadingStatus=false
      }
    })
  }
}
</script>

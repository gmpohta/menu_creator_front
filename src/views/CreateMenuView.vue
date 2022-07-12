<template>
<div v-if="addDishStatus">
  <CreateDish @cancel="cancelCreateDish" @create-dish="addDishToDB"/>
</div>
<div class="card" 
  style="border: 1px solid rgba(0, 0, 0, 0.2); border-radius:8px; text-align:left"
  v-else
>
  <h1 style="text-align:center; margin-bottom:8%;">Создание меню</h1>
  <div v-if="loadingStatus" style="text-align:center;">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div class="row" style="margin-bottom:2%;">
        <div class="col-lg-5 col-sm-10 col-sx-12 col-md-7">
        <label for="example-datepicker">Выберите дату</label>
        <b-form-datepicker id="example-datepicker" v-model="date" size="sm" class="m-2"></b-form-datepicker>
      </div>
    </div>
    
    <div v-for="itemCat,indCat in menuCategory"> 
      <div class="cat-item" @mouseover="mouseOver(itemCat.id)" @mouseleave="itemCat.isactive = false">
          <h2>{{ itemCat.name }}</h2>
          <img src="@/assets/times.png" class="right" style="height:30px;" v-show="itemCat.isactive" @click="delCategoryFromMenu(itemCat.id)"/>
      </div> 

      <div class="container">
        <div style="margin-bottom:5%" v-for="itemDish in itemCat.dishes">
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

      <div class="row justify-content-center" style="margin-bottom:2%; text-align:center">
        <div class="col-6">
          <b-button v-b-toggle="'collapse' + indCat" class="m-1" variant="outline-secondary">+Добавить блюдо</b-button>
          <b-collapse :id="'collapse'+indCat">
            <b-card >
              <div v-if="dishList.length">
                <div v-for="itemDish in dishList"
                    class="hover-grey" 
                    :key="itemDish.id" 
                >
                    <p @click="addDishToMenu({categoryId:itemCat.id,dishId:itemDish.id})">{{ itemDish.name }}</p>
                    <img src="@/assets/times.png" 
                      class="right" 
                      style="margin: -2.3rem 0; height: 20px"
                      @click="delDishFromDB(itemDish.id)"
                    />
                </div> 
              </div>
              <p v-else style="color:#ccc">Нет блюд</p>
              <hr>
              <p class="hover-green" @click="initAddDish">Добавить блюдо</p>
            </b-card>
          </b-collapse>
        </div>
      </div>

    </div>

    <div class="row justify-content-center" style="margin-bottom:2%; text-align:center">
      <div class="col-6">
        <b-button v-b-toggle.collapse-4 class="m-1">+Добавить категорию</b-button>
        <b-collapse id="collapse-4">
          <b-card >
            <div v-if="categoryList.length">
              <div v-for="itemCat in categoryList"
                class="hover-grey" 
                :key="itemCat.id" 
              >
                <p @click="addCategoryToMenu(itemCat.id)">{{ itemCat.name }}</p>
                <img src="@/assets/times.png" 
                  class="right" 
                  style="margin: -2.3rem 0; height: 20px"
                  @click="delCategoryFromDB(itemCat.id)"
                />
              </div> 
            </div>
            <p v-else style="color:#ccc">Нет категорий</p>
            <hr>
            <div class="row justify-content-center">
              <b-form inline @submit.prevent="addCategoryToDB">
                <label class="sr-only" for="inline-form-input-name">Name</label>
                <b-form-input
                  id="inline-form-input-name"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Создать категорию"
                  required
                  v-model="newCategory"
                ></b-form-input>
                <b-button variant="outline-success" type="submit">
                    Создать
                </b-button>
              </b-form>
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div>

    <div style="text-align:center; margin:5% 0 5% 0">
      <button class="btn btn-outline-secondary" :disabled="mayMenuSaved" @click="createMenu">Сохранить</button>
    </div>
  </div>
</div>
</template>

<script>
import createMenu from '@/scripts/createMenu.js'
import CreateDish from '@/components/CreateDish.vue'
import {API_URL} from "@/scripts/configAPI.js"

export default {
  name: 'CreateMenu',
  components: {
    CreateDish
  },
  methods:{
    srcImg(image){
      return API_URL+'/'+image
    },
    cancelCreateDish(){
      this.addDishStatus=false
    },
    initAddDish(){
      this.addDishStatus=true
    },
    addDishToDB(data){
      this.addDishStatus=false
      createMenu.createDish(data)
      .then(res=>{
        this.dishList.push(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    addCategoryToDB(){
      this.loadingStatus=true
      createMenu.createCategory({name:this.newCategory})
      .then(res=>{
        this.loadingStatus=false
        this.categoryList.push(res.data)
        this.newCategory=''
      })
      .catch(err=>{
        console.log(err)
        this.loadingStatus=false
        this.newCategory=''
      })
    },
    delCategoryFromMenu(categoryId){
      const indCat=this.menuCategory.findIndex(el=>el.id===categoryId)
      this.menuCategory.splice(indCat,1)
    },
    delDishFromDB(dishId){
      this.loadingStatus=true
      createMenu.delDish(dishId)
      .then(res=>{
        this.loadingStatus=false
        this.menuCategory.forEach(elMenu=>{
          let indArr=[]
          elMenu.dishes.forEach((elDish,ind,arr)=>{
            if(elDish.id===dishId){
              indArr.push(ind)
            }
          })
          for (const delIndex in indArr){
            elMenu.dishes=elMenu.dishes.splice(delIndex,1)
          }
        })
        this.dishList=res.data
      })
      .catch(err=>{
        console.log(err)
        if (err.response.data.code==='P2003'){
          alert('Вы не можете удалить блюдо, если оно в меню.')
        }
        this.loadingStatus=false
      })
    },
    delCategoryFromDB(categoryId){
      this.loadingStatus=true
      createMenu.delCategory(categoryId)
      .then(res=>{
        this.loadingStatus=false
        this.delCategoryFromMenu(categoryId)
        this.categoryList=res.data
      })
      .catch(err=>{
        console.log(err)
        if (err.response.data.code==='P2003'){
          alert('Вы не можете удалить категорию, если она в меню.')
        }
        this.loadingStatus=false
      })
    },
    mouseOver(categoryId){
      const index = this.menuCategory.findIndex(el => el.id===categoryId)
      this.menuCategory[index].isactive=true
    },
    addDishToMenu({categoryId,dishId}){
      this.menuCategory.find(el => el.id===categoryId).dishes.push(this.dishList.find(elDish=> elDish.id===dishId))
    },
    addCategoryToMenu(categoryId){
      if (this.menuCategory.findIndex(el => el.id===categoryId)===-1){
        this.menuCategory.push({...this.categoryList.find(el=>el.id===categoryId),isactive:false,dishes:[]})
      }
    },
    createMenu(){
      this.menu.date=this.date
      this.menu.links=[]
      this.menuCategory.forEach(el=>{
        const arrDish = el.dishes.map(elDish=>{return {dishId:elDish.id,categoryId:el.id}})
        arrDish.forEach(el=>this.menu.links.push(el))
      })

      this.loadingStatus=true
      createMenu.createMenu(this.menu)
      .then(res=>{
        this.$router.push('/')
      })
      .catch(err=>{
        alert(err)
        this.$router.push('/')
      })

    },
  },
  computed:{
    mayMenuSaved(){
      try{
        return !this.menuCategory[0].dishes.length
      }catch(err){
        return true
      }   
    }
  },
  data(){
    return{
      addDishStatus:false,
      loadingStatus:true,
      createDishStatus:true,
      date:new Date(),
      menu:{},
      /*menu*={
        date,
        links=[
          {categoryId,
          dishId},
        ]}*/
      menuCategory:[],
      /*menuCategory=[{
        categoryId:1,
        name:'Name',
        isactive:false,
        dishes:[{},{}]
      }]*/
      dishList:[],
      categoryList:[],
      newCategory:null,
    }
  },
  mounted(){
    this.loadingStatus=true
    createMenu.getAllDishes()
    .then(res=>{
      this.dishList=res.data
      this.loadingStatus=false
    })
    .catch(err=>{
      console.log(err)
      if (!err.code=='ERR_NETWORK'){
        this.loadingStatus=false
      }
    })
    createMenu.getAllCategories()
    .then(res=>{
      this.categoryList=res.data
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

<style>
.hover-grey:hover {
  background-color: rgba(128, 128, 128, 0.2);
  cursor: pointer;
}
.right:hover{
  cursor: pointer;
}
.hover-green:hover {
  background-color: rgba(0,80,0,0.3);
  cursor: pointer;
}
.cat-item:hover{
  background-color: rgba(128, 128, 128, 0.05);
}
.cat-item{
  display: flex;                
  justify-content: center;      
  position: relative; 
}
.right {
  position: absolute;          
  right: 2%; 
  vertical-align: middle; 
  margin: 0.5em 0;                   
}
</style>
import axios from "axios";
import {API_URL} from "./configAPI.js"

class createMenu {
    async getAllMenus(){
        return await axios({
            method:'get',
            url: API_URL + '/all-menus'})
    }
    async getAllCategories(){ 
        return await axios({
            method:'get',
            url: API_URL + '/all-categories'})

    }
    async getAllDishes(){ 
        return await axios({
            method:'get',
            url: API_URL + '/all-dishes'})

    }
    async createDish({dish,image}){
        /*dish={
            name: 'Щи',
            weight:320,
            description:'HHJhchdshddsjkdsjk',
        }*/
        let formData= new FormData()
        formData.append("image", image)
        formData.append("dish", JSON.stringify(dish));
        return await axios({
            method:'post',
            url: API_URL + '/create-dish',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData,
        })
    }
    async createCategory(category){
        /*category={
            name:"Супы"
        }*/
        try{
            return await axios({
                method:'post',
                url: API_URL + '/create-category/',
                headers: {'Content-Type':'application/json'},
                data:category
            })
        }catch(err){
          console.log(err)
          return err.response
        }
    } 
    
    async createMenu(menu){
        /*menu={
            date: '01.01.2020,
            links:[
                {categoryId:1,
                dishId:2},
                {categoryId:1,
                dishId:3},
            ]
        }*/
        return await axios({
            method:'post',
            url: API_URL + '/create-menu/',
            headers: {'Content-Type':'application/json'},
            data: menu
        })
    }

    async delDish(id){
        return await axios({
            method:'delete',
            url:API_URL + '/del-dish/'+String(id),
        })
    }
    async delCategory(id){
        return await axios({
            method:'delete',
            url:API_URL + '/del-category/'+String(id),
        })
    }
    async delMenu(id){
        return await axios({
            method:'delete',
            url:API_URL + '/del-menu/'+String(id),
        })
    }
}
export default new createMenu();
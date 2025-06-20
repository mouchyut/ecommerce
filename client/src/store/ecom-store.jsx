/* eslint-disable no-unused-vars */
import axios from 'axios'
import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import { ListCategory } from '../api/category'
import { ListProduct } from '../api/product'
const ecomStore = (set)=>({
    // key:value
    user:null,
    token:null,
    categories:[],
    products:[],
    actionLogin: async(form)=>{
        const res = await axios.post('http://localhost:5000/api/login',form)
        // console.log(res)
        set({
            user:res.data.payload,
            token:res.data.token
        })
        return res
    },
    getCategory : async (token) => {
    try {
      const res = await ListCategory(token);
      // console.log(res);
      set({categories:res.data});
    } catch (err) {
      console.log(err);
    }
  },
    ListProduct : async (token,count) => {
    try {
      const res = await ListProduct(token,count);
      // console.log(res);
      set({products:res.data});
    } catch (err) {
      console.log(err);
    }
  }
})
const usePersist ={
    name:'ecom-store',
    Storage:createJSONStorage(()=>localStorage)
}
const useEcomStore = create(persist(ecomStore,usePersist))
export default useEcomStore
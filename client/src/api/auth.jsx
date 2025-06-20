 
import axios from "axios";

export const currentUser =async(token)=> await axios.post('http://localhost:5000/api/user',{},{
    headers:{
       Authorization: `bearer ${token}`
    }
})

export const currentAdmin = async(token)=>{
    return await axios.post('http://localhost:5000/api/admin',{},{
        headers:{
            Authorization:`bearer ${token}`
        }
    })
}

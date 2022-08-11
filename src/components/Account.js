import Recat,{useState,useEffect} from 'react';
import axios from 'axios';

const Account = (props)=>{
    const [user,setUser] = useState({})

    useEffect(()=>{
        // axios.get() accept two argument one is the url second is the configuration object , keep in mind this is basically a private route meaning if we want to get user info we need to specify the token info so for that we need to set the 2nd argument as an object
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
            //and we need to send the token in the request objects headers property
            //headers is also an object
            //than we will specify x-auth:
            headers:{
                // x-auth is key 
                //value for this x-auth is the token 
                //but we are storing token inside the local storage so we will use 
                //localStorage.getItem('token)
                "x-auth":localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            // console.log(result)
            setUser(result)
        })
        .catch((error)=>{
            console.log('catch block')
            console.log(error.message)
        })

    },[])


    return(
        <div>
            <h2>User Account</h2>
            <p>Email - {user.email}</p>
            <p>Username - {user.username}</p>
        </div>
    )
}

export default Account
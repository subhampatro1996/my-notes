import React, { useState,useEffect } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import '../mynotes.css'

const MyNotes = (props)=>{
    const[title,setTitle] = useState('')
    const[body,setBody] = useState('')
    const[data,setData] = useState([])
    const[formError,setFormError] = useState({})
    const[details,setDetails] = useState([])
    const[id,setId] = useState('')
    const error = {}

    useEffect(()=>{
        axios.get('http://dct-user-auth.herokuapp.com/api/notes',{
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data  
            console.log(result)
            setData(result)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidator()
        if(Object.keys(error).length === 0){
            setFormError({})
            const formData = {
                title:title,
                body:body
            }
            axios.post('http://dct-user-auth.herokuapp.com/api/notes',formData,{
                headers:{
                    "x-auth":localStorage.getItem('token')
                }
            })
                 .then((response)=>{
                    const result = response.data
                    setData([result,...data])
                    console.log(data)
                    setTitle('')
                    setBody('')
                 })
                 .catch((error)=>{
                    console.log(error.message)
                 })
        }else{
            setFormError(error)
        }
    }

    const runValidator = ()=>{
        if(title.length === 0){
            error.title  = 'title can not be blank'
        }
    }

   const handleChange = (e)=>{
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }else if(e.target.name === 'body'){
            setBody(e.target.value)
        }
    }
    
    const handleRemove = (id)=>{
        const remove = window.confirm('Are you sure')
        console.log(remove)
        if(remove){
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,{
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data 
            console.log(result)
        })
        .catch((error)=>{
            console.log('catch block',error.message)
        })

        const res = data.filter((ele)=>{
            return ele._id !== id
        })
            setData(res)        
        }
    }

    const showDetails = (id)=>{
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,{
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            console.log("show details hook",result)
            swal({
                title:result.title,
                text: result.body
              });
            setDetails(result)
        })
        .catch((error)=>{
            console.log(error.message)
        })
        console.log("show details",details)
        
    }


    return(
     <div className="container">
        <div className="row">
         
            <div className="col-sm-7">
            
                <div className="notes-controller">
                {
                    data.length === 0 ? (
                        <div>
                        <h2>My Notes</h2>
                        <h2>No notes found add your first note</h2>
                        </div>
                    ):(
                        <div className="display-notes">
                            <div className="marginset">
                            <h2>My Notes</h2>
                            {
                                data.map((ele)=>{
                                    return(
                                        <div key={ele._id} style={{border:"2px solid #f93", margin:"10px", padding:"10px",borderRadius:"10PX"}}>
                                        <p onClick={()=>{
                                            showDetails(ele._id)
                                        }}>{ele.title}</p> 
                                        <button onClick={()=>{
                                            handleRemove(ele._id)
                                        }}>remove</button>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                }
                </div>
                </div>
            <div className="col-sm">
            
            <form className="form-horizontal" onSubmit={handleSubmit}>
            <h2>Add Note</h2>
                <input type="text" className="form-control"placeholder="Title" name="title" value={title}onChange={handleChange}></input><br/>
                {
                    formError.title && <p>{formError.title}</p>
                }
                <textarea placeholder="Body" className="form-control" rows="5" name="body" value={body}onChange={handleChange}></textarea><br/>
                <input type="submit" className="btn btn-default" value="Save"></input>
            </form>
            </div>
            </div>
        </div>
    )
}

export default MyNotes
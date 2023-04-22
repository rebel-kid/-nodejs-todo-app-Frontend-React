/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItems from "../components/TodoItems";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/tasks/${id}`,
      {/*passing empty data, can optimise further*/ },
      { withCredentials: true });
    toast.success(data.message);
    setRefresh((prev)=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`,
     //can't pass data in delete
      { withCredentials: true });
    toast.success(data.message);
    setRefresh((prev)=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/tasks/new`,
        { title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev)=>!prev);  //helps rendering of component -> so instant result is shown using useEffect
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setTitle("");
    setDescription("");
  }

  //for showing tasks on same page now -> as we needed it constantly to be shown
  useEffect(() => {
    axios.get(`${server}/tasks/my`, {
      withCredentials: true
    }).then((res) => {
      // console.log(res.data.tasks); -> push into array and map on screen
      setTasks(res.data.tasks)
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }, [refresh])
  //navigate to login if logged out and not authenticated
  if(!isAuthenticated) return <Navigate to={"/login"}/>

  return (
    <>
      <div className="container">
        <div className='login'>
          <section>
            <form onSubmit={submitHandler}>
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="Title"
              />
              <input
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="Description"
              />
              <button type='submit' disabled={loading}>Add Task</button>
            </form>
          </section>
        </div>
        {/* TODO section here, map setTasks */}
        <section className="todosContainer">
          {
            tasks.map((item) => {
              return <TodoItems key={item._id} title={item.title} description={item.description} isCompleted={item.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={item._id} />
              // eslint-disable-next-line no-unreachable
              {/* <div key={item._id}>{item.title}</div> -> we'll render component instead of that */ }
            })
          }
        </section>
      </div>
    </>
  )
};

export default Home;
import React from "react";
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import {useNavigate} from 'react-router-dom'
import Navigation from "../componets/navBar";
import Logo from "../assets/yellow-logo.png"

function Edit(){

    //get the id from the url
    const { id } = useParams();

    //set up state variables
    const [post, setPost] = React.useState(null);
    const navigate = useNavigate();

    const isCheckedTopic = (topic) => {
        return post.topic === topic;
      };

    //fetch the crewmate from the database
    React.useEffect(() => {
        const getPost = async () => {
            const {data} = await supabase
            .from('stars')
            .select()
            .eq('id', id)

            if(data.length > 0){
                setPost(data[0]);
            }
        }
        getPost().catch(console.error);
    }, [id]);

    //update the crewmate
    const updatePost = async (e) => {
        e.preventDefault();

        //update the crewmember in the database
        await supabase.from('stars').update({
            title: post.title,
            description: post.description,
            image_url: post.image_url,
            pin: post.pin
        }).eq('id', id);

        //redirect to the home page
        navigate(`/info/${id}`);
    }

    //delete the crewmate
    const deletePost = async (e) => {
        e.preventDefault();

        //delete the crewmate from the database
        await supabase.from('stars').delete().eq('id', id);

        //redirect to the home page
        // window.location = 'gallery';
        navigate(`/info/${id}`);
    }

    if (!post) {
        return <h1>Loading...</h1>
    }


    return(
        <div className="edit">
            
            <h1 className="namePage">Editing your Archive Post...</h1>
            
            <div className="edit-content">
                <h2><i>May the Force guide your edits</i></h2>
                {/* <img className="characterImage" src={Logo} alt="fortnite Characters" width="95%" height="auto"/> */}
                <form onSubmit={updatePost}>
                <div className="mini-container">
                        <label>Title:</label>
                        <input type="text" value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} id="title" required/>
                    </div>

                    <div className="mini-container">
                        <label>Description:</label>
                        <input type="text" onChange={(e) => setPost({...post, description: e.target.value})} value={post.description} id="description"  width="80%" required/>
  
                    </div>
                    <div className="mini-container">
                        <label>Image URL:</label>
                        <input type="text" value={post.image_url} onChange={(e) => setPost({...post, image_url: e.target.value})} id="image_url" required/>
                    </div>
                    
                    <div className="mini-container">
                        <label>Topic:</label>
                        <label>
                            <input type="radio" name="topic" id="movie" checked={isCheckedTopic('movie')} value="movie" onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            Movies
                        </label>
                        <label>
                            <input type="radio" name="topic" id="show" checked={isCheckedTopic('show')} value="show" onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            TV Series
                        </label>
                        <label>
                            <input type="radio" name="topic" id="comic" checked={isCheckedTopic('comic')} value="comic" onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            Comics
                        </label>
                        <label>
                            <input type="radio" name="topic" id="game" checked={isCheckedTopic('game')} value="game" onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            Games
                        </label>
                        <label>
                            <input type="radio" name="topic" id="character" checked={isCheckedTopic('character')} value="character" onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            Characters
                        </label>
                        <label>
                            <input type="radio" name="topic" id="product" checked={isCheckedTopic('product')} value="product" onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            Products
                        </label>
                        <label>
                            <input type="radio" name="topic" id="other" checked={isCheckedTopic('other')}  onChange={(e) => setPost({...post, topic: e.target.value})}/>
                            <span className="topic"></span>
                            Other
                        </label>
                    </div>
                    <button type="submit">Update</button>
                    <button onClick={deletePost}>Delete</button>
                </form>
            </div>
        </div>
    )
}

export default Edit
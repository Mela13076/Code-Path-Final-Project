// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '../client';
// import Navigation from '../componets/navBar';
// import { Link } from 'react-router-dom';

// function Info(){

//     //get the id from the url
//     const { id } = useParams();

//     //set up state variables
//     const [post, setPost] = useState(null);
//     const [pin, setPin] = useState('');
//     const [errorMsg, setErrorMsg] = useState('');
//     const navigate = useNavigate();

//     //fetch the character from the database
//     useEffect(() => {
//         const getPost = async () => {
//             const { data } = await supabase
//                 .from('stars')
//                 .select()
//                 .eq('id', id);

//             if (data.length > 0) {
//                 setPost(data[0]);
//             }
//         };
//         getPost().catch(console.error);
//     }, [id]);

//     const handleUpvote = async (postId, currentUpvotes) => {
//         // increment the upvotes by 1
//         const newUpvotes = currentUpvotes + 1;

//         // update the post in the database
//         const { error } = await supabase
//             .from('stars')
//             .update({ up_votes: newUpvotes })
//             .eq('id', postId);

//         if (error) {
//             console.log('Error updating post:', error);
//         } else {
//             // update the post state with the new upvotes
//             setPost({ ...post, up_votes: newUpvotes });
//         }
//     };

//     const handleEditClick = async (event) => {
//         event.preventDefault();
//         const enteredPin = parseInt(pin);

//         if (isNaN(enteredPin)) {
//             setErrorMsg('Please enter a valid PIN.');
//             return;
//         }

//         if (post.pin !== enteredPin) {
//             setErrorMsg('Incorrect PIN. Cannot edit.');
//             return;
//         }

//         navigate(`/edit/${post.id}`);
//     };

//     if (!post) {
//         return <h1>Loading...</h1>;
//     }

//     return(
//         <div className="info">
//            <Navigation />
//            <h1 className='namePage'>Archive Page</h1>
//            <div className="contentInfo">
//                 <h2>{post.title}</h2>
//                 <p>Description: {post.description}</p>
//                 <p>Topic: {post.topic}</p>
//                 <button className='starsBtn' onClick={() => handleUpvote(post.id, post.up_votes)}>⭐️ {post.up_votes}</button>
//                 <br />
//                 <form onSubmit={handleEditClick}>
//                     <input
//                         type="number"
//                         placeholder="Enter PIN when created"
//                         value={pin}
//                         onChange={(event) => setPin(event.target.value)}
//                     />
//                     <button className="editBtn" type='submit'>
//                         Edit
//                     </button>
//                 </form>
//                 {errorMsg && <p className="errorMsg">{errorMsg}</p>}
//            </div>
//            <div className='comments'>
//                 <p>comments come here</p>
//            </div>
//         </div>
//     )
// }

// export default Info;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Navigation from '../componets/navBar';
import { Link } from 'react-router-dom';

function Info(){

    //get the id from the url
    const { id } = useParams();

    //set up state variables
    const [post, setPost] = useState(null);
    const [pin, setPin] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const [commentName, setCommentName] = useState('');
const [commentContent, setCommentContent] = useState('');


    //fetch the character from the database
    useEffect(() => {
        const getPost = async () => {
            const { data } = await supabase
                .from('stars')
                .select()
                .eq('id', id);

            if (data.length > 0) {
                setPost(data[0]);
            }
        };
        getPost().catch(console.error);
    }, [id]);

    const handleUpvote = async (postId, currentUpvotes) => {
        // increment the upvotes by 1
        const newUpvotes = currentUpvotes + 1;

        // update the post in the database
        const { error } = await supabase
            .from('stars')
            .update({ up_votes: newUpvotes })
            .eq('id', postId);

        if (error) {
            console.log('Error updating post:', error);
        } else {
            // update the post state with the new upvotes
            setPost({ ...post, up_votes: newUpvotes });
        }
    };

    const handleEditClick = async (event) => {
        event.preventDefault();
        const enteredPin = parseInt(pin);

        if (isNaN(enteredPin)) {
            setErrorMsg('Please enter a valid PIN.');
            return;
        }

        if (post.pin !== enteredPin) {
            setErrorMsg('Incorrect PIN. Cannot edit.');
            return;
        }

        navigate(`/edit/${post.id}`);
    };

    //add a comment to the json column on the Posts table in the database
    const addComment = async (e) => {
        e.preventDefault();

        const newComment = {
            text: comment,
            timestamp: new Date().toISOString()
        };

        //update the comment column in the database
        await supabase.from('Posts')
        .update({
            comment: [...post.comments, newComment]
        }).eq('id', id);

        setPost({
          ...post,
          comment: [...post.comments, newComment]
        });
    }

    //delete a comment from the json column on the Posts table in the database

    const deleteComment = async (index) => {
        // Remove the comment from the post.comment array
        post.comment.splice(index, 1);
      
        // Update the comment column in the database
        await supabase.from('Posts')
          .update({
            comment: post.comment
          })
          .eq('id', id);
      
        // Update the local state with the new array
        setPost({
          ...post,
          comment: post.comment
        });
      }

    //edit the comment in the json column on the Posts table in the database
    const editComment = async (e, commentIndex, newText) => {
        e.preventDefault();
      
        // Make a copy of the post comments array
        const updatedComments = [...post.comment];
      
        // Update the text of the comment at the given index
        updatedComments[commentIndex].text = newText;
      
        // Update the comment column in the database
        await supabase.from('Posts')
          .update({
            comment: updatedComments
          }).eq('id', id);
      
        // Update the local state to reflect the change
        setPost({
          ...post,
          comment: updatedComments
        });
      }
        


    if (!post) {
        return <h1>Loading...</h1>;
    }

    return(
        <div className="info">
           <Navigation />
           <h1 className='namePage'>Archive Page</h1>
           <div className="contentInfo">
                <h2>{post.title}</h2>
                <p>Posted at: {post.created_at}</p>
                <p>Description: {post.description}</p>
                <p>Topic: {post.topic}</p>
                <button className='starsBtn' onClick={() => handleUpvote(post.id, post.up_votes)}>⭐️ {post.up_votes}</button>
                <br />
                <form onSubmit={handleEditClick}>
                    <input
                        type="number"
                        placeholder="Enter PIN when created"
                        value={pin}
                        onChange={(event) => setPin(event.target.value)}
                        />
                        <button className="editBtn" type='submit'>
                            Edit
                        </button>
                    </form>
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
               </div>
               <div className='comments'>
               <h3>Comments</h3>
                    <section className='all-comments'>
                        {
                            post.comment && post.comment
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                            .map((comment, index) => (
                            <div key={index} className='comment'>
                                {
                                //this sections skips default comments and shows every comment after index 0
                                index > 0 && (
                                    <ul>
                                        <li>{comment.text} <button  onClick={() => deleteComment(index)}>🗑️</button></li>
                                            
                                        
                                    </ul>         
                                )
                                }
                            </div>
                            ))
                        }
                    </section>

                    <section className='add-comment'>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addComment(e);
                            setComment('');
                        }
                        }>
                            <input
                                type='text'
                                placeholder='Add a comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className="add-button" type='submit'>Add</button>
                        </form>
                    </section>
                </div>

            </div>
        )
    }
    
    export default Info;

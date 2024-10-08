import { useState, useEffect } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "./firebaseConfig"
import { useNavigate } from "react-router-dom"


function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")

    const postCollectionRef = collection(db, "posts")
    let navigate = useNavigate()
    // function to post the data to the firestore database
    const createPost = async () => {
        await addDoc(postCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
        });
        navigate("/")
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    })


    return (
        <div className='createPostPage'>
            <div className="cpContainer">
                <h1>Create a Post</h1>
                <div className="inputGp">
                    <label>Title :</label>
                    <input placeholder="Enter the title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="inputGp">
                    <label>Blog Content</label>
                    <textarea placeholder="Write the blog" onChange={(e) => setPostText(e.target.value)}></textarea>
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost
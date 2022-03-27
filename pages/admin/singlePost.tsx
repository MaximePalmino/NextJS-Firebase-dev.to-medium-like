
import UserProfil from "../../components/UserProfile"
import UserPosts from "../../components/UserPosts"
import { useEffect, useState } from 'react';
import {  collection, getDocs,getDoc, doc} from 'firebase/firestore';
import { firestore, auth  } from '../../lib/firebase';
import { useRouter } from "next/router";

const singlePost: React.FC = () => {

    const router = useRouter()
    const id = router.query.post
    const [title, setTitle] = useState<string>()
    const [content, setContent] = useState<string>()
    const [isValid, setIsValid] = useState<boolean>(false)

    const test = async () => {
        const getPosts = await getDocs(collection(firestore, 'users', auth.currentUser.uid, 'posts'))
        getPosts.forEach((doc) => {
            if (id == doc.id) {
                setTitle(doc.data().title)
                setContent(doc.data().content)
            } 
        })
    }


    useEffect(() => {
        setTimeout(() => { 
            console.log(id)
            test()
        }, 500)
    }, [router])




    return(
        <>
        <div className="box-center">
            <div className="card">
            {isValid && (
                    <>
                    <form>
                        <button onClick={(() => {setIsValid(!isValid)})}>Confirm</button>
                        <button onClick={(() => {setIsValid(!isValid)})}>Cancel</button>

                        <input value={title}></input>
                        <input value={content}></input>
                    </form>
                    
                    </>
                
            )}
            {!isValid && (
                <>
                    <button onClick={(() => {setIsValid(!isValid)})}>edit</button>
                    <h1>{title}</h1>
                    <p> {content} </p>
                </>
            )}
            </div>
        </div>
        </>
    )
}
export default singlePost
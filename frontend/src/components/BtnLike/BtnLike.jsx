import { useEffect, useState } from "react"
import api from "../../utils/api.js"
export default function BtnLike({likes, myid, cardid}) {

    const[isLike, setIsLike] = useState(false)
    const[count, setCount] = useState(likes.length)

    const token = localStorage.getItem("jwt");

    useEffect(() => {
      setIsLike(likes.some(element => myid === element))  
    }, [likes, myid])

    function handleLike() {
        if (isLike) {
            api.deleteLike(cardid, token)
            .then(res => {
             setIsLike(false)
             setCount(res.likes.length)
            })
            .catch(err => console.log(`Ошибка при снятии лайка ${err}`))
        } else {
            api.addLike(cardid, token)
            .then(res => {
                setIsLike(true)
                setCount(res.likes.length)
               }
            ).catch(err => console.log(`Ошибка при установлении лайка ${err}`))
        }
    }

    return (
        <>
         <button type="button" className={`element__main-vector ${isLike ? 'element__main-vector_active' : ''}`} onClick={handleLike} />
         <p className="element__count">{count} </p>
        </>
    )
}
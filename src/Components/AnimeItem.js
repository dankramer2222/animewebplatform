import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AnimeItem() {
    const {id}=useParams()
    
//state
const [anime,setAnime] = React.useState({})
const [characters,setCharacters] = React.useState([])
const [showMore, setShowMore] = React.useState(false)

    //destructure anime
    const {
        title, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source } = anime

    //get anime besed by id or title(i didnt choose yet)
    const getAnime = async(anime)=>{
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
        console.log(data.data)

    }
    useEffect(()=>{
        getAnime(id)
    }, [])
        

  return (
    <div>
        <h1>{title}</h1>
        <div className='details'>
            <div className='detail'>
                <div className='image'>
                  <img src={images?.jpg.large_image_url} alt="" />
                </div>
                  <div className='anime-details'>
                  <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                  </div>
            </div>
        </div>
        <p className="description">
        {showMore ? synopsis : (synopsis && synopsis.length > 300 ? synopsis.slice(0, 300) + '...' : synopsis)}
            
            <button onClick={()=>{
                setShowMore(!showMore)
            }}>{showMore ? 'Show Less': 'Read More'}</button>
        </p>
        <h3 className='title'>Trailer</h3>
        <div className='trailer-con'></div>
        {trailer && trailer.embed_url && <iframe src={trailer.embed_url} title={title} frameBorder="0" allowFullScreen></iframe>}

        </div>
  )
}

export default AnimeItem
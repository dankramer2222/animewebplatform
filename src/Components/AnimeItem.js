import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../context/global";

const AnimeItemStyled = styled.div`
  padding: 3rem 18rem;
  background-color: #ededed;

  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient( to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;

    &:hover {
      transform: skew(-3deg);
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;

    .detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      img {
        border-radius: 7px;
        max-width: 100%;
        height: auto;
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p{
        display:flex;
        gap: 0.5rem;
      }
      p span:first-child{
        font-weight:600;
        color:#454e56;
      }
    }
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient( to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .trailer-con {
    display:flex;
    justify-content:center;
    align-items:center;
    iframe{
        outline:none;
        border: 5px solid #e5e7eb;
        padding: 1.5rem;
        border-radius: 10px;
        background-color: #FFFFFF;

    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
  }
  
  .character {
    padding: .4rem .6rem;
    border-radius: 7px;
    background-color: #EDEDED;
    transition: all .4s ease-in-out;
  }
  
  .character img {
    width: 100%;
  }
  
  .character h4 {
    padding: .5rem 0;
    color: #454e56;
  }
  
  .character p {
    color: #27ae60;
  }
  .character:hover {
    transform: translateY(-5px);
    /* Добавьте другие стили, которые вы хотите применить при наведении */
  }
  .character img {
    max-height: 300px; /* Установите желаемую максимальную высоту */
    width: 100%;
    object-fit: cover;
  }

        }

         }
      }
  }
`;

function AnimeItem() {
    const { id } = useParams();
    const { popularAnime, loading, getPopularAnime } = useGlobalContext();
  
    //state
    const [anime, setAnime] = React.useState({});
    const [characters, setCharacters] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);
  
    //destructure anime
    const {
      title,
      synopsis,
      trailer,
      duration,
      aired,
      season,
      images,
      rank,
      score,
      scored_by,
      popularity,
      status,
      rating,
      source,
    } = anime;
  
    //get anime based on id
    const getAnime = async (anime) => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
      const data = await response.json();
      setAnime(data.data);
    };
  
    //get characters
    const getCharacters = async (anime) => {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime}/characters`
      );
      const data = await response.json();
      setCharacters(data.data);
      console.log(data.data);
    };
  
    useEffect(() => {
      getAnime(id);
      getCharacters(id);
    }, []);
  
    return (
      <AnimeItemStyled>
        <h1>{title}</h1>
        <div className="details">
          <div className="detail">
            <div className="image">
              <img src={images?.jpg.large_image_url} alt="" />
            </div>
            <div className="anime-details">
              <p>
                <span>Aired:</span>
                <span>{aired?.string}</span>
              </p>
              <p>
                <span>Rating:</span>
                <span>{rating}</span>
              </p>
              <p>
                <span>Rank:</span>
                <span>{rank}</span>
              </p>
              <p>
                <span>Score:</span>
                <span>{score}</span>
              </p>
              <p>
                <span>Scored By:</span>
                <span>{scored_by}</span>
              </p>
              <p>
                <span>Popularity:</span>
                <span>{popularity}</span>
              </p>
              <p>
                <span>Status:</span>
                <span>{status}</span>
              </p>
              <p>
                <span>Source:</span>
                <span>{source}</span>
              </p>
              <p>
                <span>Season:</span>
                <span>{season}</span>
              </p>
              <p>
                <span>Duration:</span>
                <span>{duration}</span>
              </p>
            </div>
          </div>
        </div>
        <p className="description">
          {showMore
            ? synopsis
            : synopsis && synopsis.length > 300
            ? synopsis.slice(0, 300) + "..."
            : synopsis}
  
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </p>
        <h3 className="title">Trailer</h3>
        <div className="trailer-con">
          {trailer && trailer.embed_url && (
            <iframe
              src={trailer.embed_url}
              title="Inline Frame Example"
              width="800"
              height="450"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
  
        <h3 className="title">Characters</h3>
        <div className="characters">
          {characters?.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
  
            return (
              <Link to={`/character/${mal_id}`} key={index} className="character-link">
                <div className="character">
                  <img src={images?.jpg.image_url} alt={name} />
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </AnimeItemStyled>
    );
  }
  
  export default AnimeItem;
  

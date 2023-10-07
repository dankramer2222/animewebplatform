import React from 'react'
import Popular from './Popular'

function Homepage() {

    const[rendered,setRendered] = React.useState('popular')

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered ={rendered}/>
            default:
                return <Popular rendered ={rendered}/>
        }
    }

  return (
    <div>
        <header>
            <div className='logo'>
                <h1>{rendered == 'popular'?'Popular Anime':'Search Results'}</h1>
            </div>
        </header>
    </div>
  )
}

export default Homepage
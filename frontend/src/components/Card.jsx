import React from 'react'

const Card = ({view,data}) => {
  return (

    <>
    <div className={`${view === 'list' ? 'border b-2 bg-gray-200 w-full h-[200px] ' : 'border b-2 bg-gray-200 w-[250px]  m-3 '} `}>
        <div className={`${view === 'list' ? 'flex flex-row':'flex flex-col'}`}>
           <img src={data.image} alt='terrain' className={`${view === 'list' ? 'h-full w-[200px]':'h-[100px] '}`}/>
           <div className={`${view === 'list' ? '' : 'justify-start'}`}>
              <h3 className='text-bold text-xl'>{data.name}</h3>
              <p>Adresse</p>
           </div>
        </div>
        
        
    </div>

    </>
  )
}

export default Card
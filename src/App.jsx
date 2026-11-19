import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [imgdata, setImgdata] = useState([]);

  const [index, setIndex] = useState(1);

  const getData = async ()=>{
    const resp = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=12`)
    setImgdata(resp.data);
  }

  useEffect(function(){
    getData();
  },[index])

  let printUserData = <h3 className='bold text-gray-600 flex justify-center items-center'>Loading User Data. Please Wait...</h3>
  if(imgdata.length>0){
    printUserData=imgdata.map(function(elem,idx){
      return <a href={elem.url} target='_blank'>
        <div key={idx}>
          <div className='h-40 w-44 rounded-xl overflow-hidden bg-white'>
            <img className='h-full object-cover w-full' src={elem.download_url} alt="" />
          </div>
          <h2>{elem.author}</h2>
       </div>
      </a>
    })
  }

  return (
    <div className='bg-black flex flex-col overflow-auto p-4 h-screen text-white'>
      <div className='flex flex-1 content-start flex-wrap gap-5 items-center py-10 justify-center'>
        {printUserData}
      </div>
      <div className='flex justify-center gap-6 items-center p-4 mt-auto'>
        <button className='bg-amber-200 text-sm text-black rounded active:scale-95 cursor-pointer px-4 py-2 font-semibold' onClick={()=>{
          if(index>1){
            setImgdata([])
            setIndex(index-1)
          }
        }}>Prev</button>
        <h5>Page {index}</h5>
        <button className='bg-amber-200 text-sm text-black rounded active:scale-95 cursor-pointer px-4 py-2 font-semibold' onClick={()=>{
          setImgdata([])
          setIndex(index+1)
        }}>Next</button>
      </div>
    </div>
  )
}

export default App
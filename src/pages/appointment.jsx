import React,{useContext,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'
import { assets } from '../assets/assets'
import Relateddoctors from '../components/Relateddoctors'

const Appointment = () => {
  const {docId}=useParams()
  const {doctors,currencysymbol}=useContext(Appcontext)
  const daysofweek=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const [docInfo,setDocInfo]=useState(null)
  const [docSlots,setdocSlots]=useState([])
  const [slotIndex,setslotIndex]=useState(0)
  const [slotTime,setslotTime]=useState('')

  const fetchDocInfo = async()=>{
    const docInfo=doctors.find( doc => doc._id===docId)
    setDocInfo(docInfo)
    //console.log(docInfo)
  }

  const getAvaliableSlots=async()=>{
    setdocSlots([])

    let today=new Date()
    for(let i=0;i<7;i++){
      let currentDate=new Date(today)
      currentDate.setDate(today.getDate()+i)

      let endtime =new Date()
      endtime.setDate(today.getDate()+i)
      endtime.setHours(21,0,0,0)

      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots=[]
      while(currentDate<endtime){
        let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setdocSlots(prev=>([...prev,timeSlots]))
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
    getAvaliableSlots()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])

  return docInfo &&(
    <div>
      {/* doc details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* doc info */}
          <p className='flex items-center gap-2 text-2x1 font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt=""/>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 textgray-600'>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-x5 rounded-full'>{docInfo.experience}</button>
          </div>
          {/* doc about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt=""/></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencysymbol}{docInfo.fees}</span></p>
        </div>
      </div>
      {/* slot booking*/}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>setslotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-primary text-white' :"border border-gray-200"}`} key={index}>
                <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p> 
                <p>{item[0]&&item[0].datetime.getDate()}</p> 
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index)=>{
            <p onClick={()=>setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime? 'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          })}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}   
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>
      {/* related docs */}
      <Relateddoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}


export default Appointment
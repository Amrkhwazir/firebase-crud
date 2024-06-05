import React, { useEffect } from 'react'
import "./userData.css"
import { Trash } from 'react-bootstrap-icons'
import { Pen } from 'react-bootstrap-icons'
import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { db, setDoc, doc, getDocs, collection, updateDoc, deleteDoc } from '../../firebaseConfig'




export const UserData = () => {

  const [modal, setModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState({val: false, })
  const [blogdata, setBlogData] = useState([])

//  delete data fun

const deleteData = async (Id) => {

  await deleteDoc(doc(db, "blogs", Id));
  window.location.reload()
}


  useEffect(()=>{

    const getData = async () => {
      const blogCollectionRef = collection(db, "blogs");
      const data = await getDocs(blogCollectionRef);
      setBlogData(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
   
    }
  
  getData();
  },[])

// console.log(openUpdateModal);

  return (
    <div className='mainContainer'>
      <div className='subContainer'>
        <div className='childOne'>
          <h2 className='title'>Crud Operation</h2>
          <button onClick={() => setModal(true)}>Add+</button>
        </div>
        {
          blogdata.map((item)=>(

            <div className='childTwo' key={item.id} >
          <p className='titlePara'>Title: {item.title}</p>
          <p className='blog'>Blog: {item.blog}</p>
          <div className='icons'>
          <Pen size={18} onClick={() => setOpenUpdateModal({val: true, id: item.id})}/>
          <Trash size={18} onClick={() => deleteData(item.id)}/>
          </div>
        </div>
          ))
        }
      </div>
      {modal === true && <Example />}
      {openUpdateModal.val === true && <UpdateModal uid={openUpdateModal.id} />}
    </div>
  )
}




//// modal opener for add data
function Example() {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState("")
  const [blog, setBlog] = useState("")
  const time = new Date().getTime();
const id = time.toLocaleString()


/// add data func
const addData = async () => {

try{
  await setDoc(doc(db, "blogs", id), {
    title: title,
    blog: blog,
    });
    window.location.reload();
    console.log("data added");
}catch(error){
console.log(error);
}
  
}

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen} >
        <TransitionChild 
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Create Your Blog's
                      </DialogTitle>
                      <div className="mt-2">
                        <input className=' border-2 border-gray-600 w-96 p-1 pl-2 rounded-md' type='text' placeholder='Enter Your Title' required onChange={(e) => setTitle(e.target.value)}  />
                      </div>
                      <div className="mt-2">
                        <textarea className=' border-2 border-gray-600 w-96 h-40  p-1 pl-2 rounded-md' type='text' placeholder='Enter Your Blog...' required onChange={(e) => setBlog(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={addData}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}



//// modal opener for update data data
function UpdateModal({uid}) {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState("")
  const [blog, setBlog] = useState("")


/// add data func
const update = async (uuid) => {
try{

  const washingtonRef = doc(db, "blogs", uuid);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  title: title,
  blog: blog,

});
 window.location.reload();
}catch(error){
console.log(error);
}
  
}

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen} >
        <TransitionChild 
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Update Your Blog's
                      </DialogTitle>
                      <div className="mt-2">
                        <input className=' border-2 border-gray-600 w-96 p-1 pl-2 rounded-md' type='text' placeholder='Enter Your Title' onChange={(e) => setTitle(e.target.value)}  required/>
                      </div>
                      <div className="mt-2">
                        <textarea className=' border-2 border-gray-600 w-96 h-40  p-1 pl-2 rounded-md' type='text' placeholder='Enter Your Blog...' onChange={(e) => setBlog(e.target.value)} required/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={() => update(uid)}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

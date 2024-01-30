// //@ts-ignore
// //@ts-nocheck
"use client"
import { ModalRoot } from 'decl-modal/react';

import { twMerge } from 'tailwind-merge';

import { modak } from '../fonts';

import { devModals } from '@/Components/DevModals/DevModals';
import { myGenericModal } from '@/Components/DevModals/test';


// import { ModalFactory } from "./factorys/modal.factory"

// // const {unsubscribe} = showModal.suscribe((Component, ComponentProps) => { })


// // // Complex case with spinner in modal bi - directional - communication
// // const {response} = await showModal('TestComponent', {exacly: 'exacto!' })
// // const promise = new Promise(resolve => setTimeout(resolve, 2000))
// // await sendMessage({promise, closable: false })
// // await waitMessage()


// // const {waitFor} = await resolveModal({ })
// // const {response} = await waitMessage()
// // await response.promise
// // resolveModal()
// // close()

// // Very Simple Case
// // const {response} = await showModal('TestComponent', {exacly: 'exacto!' })
// // if (response === true) {
// //     // Do something
// // }


// // resolveModal({})
// // close()


// // Very Simple tipical Case withouth return
// // showModal('TestComponent', { exacly: 'exacto!' })


// // close()


interface PageProps { }

const Page: React.FC<PageProps> = () => {

  // useEffect(() => {

  //   const interval = setInterval(() => setCount(prev => prev + 1), 500)


  //   return () => clearInterval(interval)
  // }, [])


  const onShow = async () => {
    // local variable 
    let xd;

    const { updateModal, response, sendMessage, waitFor } = await myGenericModal.show({ myProp: 'Holi' })

    if (response === 'Holi2') {
      // do something...
      return
    }

    // setMessagge(response as string)
    // await new Promise(resolve => setTimeout(resolve, 2000))
    // updateModal({ myMessage: 'Hola soy un segundo mensaje!' })

    // console.log(await waitFor(), await waitFor(), await waitFor())

  }

  const onShowDevModals = async () => {

    devModals.show('TestComponent', { exacly: 'exacto!' })
    devModals.show('Exacto3', { message: 'Hola! 1' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 2' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 3' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 4' }, { override: false })
    myGenericModal.show({ myProp: 'Holi' })
    devModals.show('Exacto3', { message: 'Hola! 5' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 6' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 7' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 8' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 9' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 10' }, { override: false })
    devModals.show('Exacto3', { message: 'Hola! 11' }, { override: false })


    const { response } = await myGenericModal.show({ myProp: 'Holi' })

    // setTimeout(() => {
    //   
    // },1000);

    // Test Border case change modal
    // setTimeout(() => {
    //   devModals.show('Exacto3', { message: 'holi3' })
    // }, 500)


    // const { response, updateModal  } = await devModals.show('TestComponent', { exacly: 'exacto!' })

    // updateModal({exacly: 'exacto!'})

    // if(response !== true) return

    // // do something...

    // const { response: r1 } = await devModals.show('Exacto2', { message: 'holi' })
    // const { response: r2 } = await devModals.show('Exacto3', { message: 'holi3' })
  }
  return (
    <>
      <div className='h-full w-full bg-[#fafafafa] flex'>
        <div className='flex-1 bg-blue-600 relative'>
          <div className={twMerge('text-[200px] myClass absolute top-0', modak.className)} onClick={() => onShowDevModals()}>
            Holi
          </div>
          <ModalRoot modalFactory={myGenericModal} animation='fade' />
        </div>

        <div className='flex-1 bg-blue-300 relative'>
          <ModalRoot modalFactory={devModals} animation='pop' />
        </div>
      </div>
      {/* <ModalContainer>
        <div className='fixed bg-black bg-opacity-40 flex top-0 bottom-0 left-0 right-0'>
          <div className='m-auto p-5 rounded-md bg-white'>
            <p className='font-bold text-center'>Holi {count}</p>
          </div>
        </div>
      </ModalContainer> */}
    </>
  );
};

export default Page;

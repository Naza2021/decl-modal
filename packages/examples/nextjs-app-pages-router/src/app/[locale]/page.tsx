"use client"
import { ModalRoot, showModal } from "@/Components/Examples/ExampleModal"
import { TooltipRoot, generateShowTooltip } from "@/Components/Examples/TooltipExample"
import { InputComponentRoot, InputComponentRoot2, showInputModal } from "@/Components/InputModal"
import { ModalFactory, ModalProps } from "decl-modal"
import { useState } from "react"

interface MyFirstModalProps extends ModalProps {
  myCustomProp?: any
}

const MyFirstModal: React.FC<MyFirstModalProps> = ({ closeModal }) => {
  return (
    <div className='flex fixed opacity-0 bg-black bg-opacity-70 top-0 bottom-0 w-full'
      onClick={() => closeModal(false)} data-modal-type='back'>
      <div className="m-auto" data-modal-type='container'>
        <div className="bg-white rounded-md p-5 font-bold">
          Hello world! :)
        </div>
      </div>
    </div>
  )
}


interface PageProps {

}

const showTooltip = generateShowTooltip()

const Page: React.FC<PageProps> = ({ }) => {

  const [input, setinput] = useState('')

  return (
    <>
      <div className="bg-[#303030] h-full w-full flex">
        <div className="m-auto flex flex-col gap-4 items-center">
          <div className="flex gap-12 items-center">
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={() => showModal('ModalComponent')}>
              Modal
            </button>
            <p className="text-white" onMouseEnter={showTooltip}>
              Tooltip | Popup
            </p>
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={async () => {
              const { response } = await showInputModal('TestComponent2', { myProp: 'holi' }, { waitAnimation: true, animation: 'pop' })
              if (typeof response === 'string') setinput(response)
            }}>
              Input
            </button>
          </div>
          {input && <p className="text-white max-w-[160px] text-ellipsis overflow-hidden text-center text-nowrap break-keep">
            Input: {input}
          </p>}
        </div>
      </div >
      <ModalRoot animation='bubble' />
      <InputComponentRoot animation='bubble' config={{ TestComponent: { animation: 'fade' } }} />
      <InputComponentRoot2 />
      <TooltipRoot />
    </>
  )
}
export default Page

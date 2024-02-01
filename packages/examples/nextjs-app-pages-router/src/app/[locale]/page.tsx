"use client"
import { ModalRoot, showModal } from "@/Components/Examples/ExampleModal"
import { PopupRoot, showMyPopup } from "@/Components/Examples/PopupExample"
import { TooltipAnimation, TooltipRoot, showMyTooltip } from "@/Components/Examples/TooltipExample"
import { InputComponentRoot, InputComponentRoot2, showInputModal } from "@/Components/InputModal"
import { useState } from "react"

interface PageProps {

}

const Page: React.FC<PageProps> = ({ }) => {

  const [input, setinput] = useState('')

  return (
    <>
      {/* <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" className="bg-opacity-40 fixed top-[350px] left-[700px] bg-blue-600" onMouseLeave={console.log}>
        <defs>
          <mask id="mask" x="0" y="0" width="200" height="200" >
            <rect x="25" y="25" width="50" height="50" fill='white' />
            <rect x="125" y="25" width="50" height="50" fill='white' />
          </mask>
        </defs>
        <rect x="10" y="10" width="80" height="80" />
        <rect x="110" y="10" width="80" height="80" className="text-transparent bg-transparent cursor-pointer pointer-events-none" fill="currentColor" />
      </svg> */}
      <div className="bg-[#303030] h-full w-full flex">
        <div className="m-auto flex flex-col gap-4 items-center">
          <div className="flex gap-12 items-center">
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={() => showModal('ModalComponent')}>
              Menu
            </button>
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={(e) => showMyPopup(e, 'Popup')}>
              Popup
            </button>
          </div>
          <div className="flex gap-12 items-center mt-6">
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={() => showModal('ModalComponent')}>
              Modal
            </button>
            <p className="text-white" {...showMyTooltip('Holi')}>
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
      <PopupRoot animation={{back: {config: {duration: 3000}}, container: {config: {duration: 3000}}}} />
      <TooltipRoot animation={TooltipAnimation} />
    </>
  )
}
export default Page

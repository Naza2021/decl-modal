"use client"
import { MenuAnimation, MenuRoot, showMenu } from "@/Components/Examples/ExampleMenu"
import { ModalRoot, showModal } from "@/Components/Examples/ExampleModal"
import { PopupRoot, showMyPopup } from "@/Components/Examples/PopupExample"
import { ToastAnimation, ToastRoot, showToast } from "@/Components/Examples/ToastExample"
import { TooltipAnimation, TooltipRoot, showMyTooltip } from "@/Components/Examples/TooltipExample"
import { InputComponentRoot, InputComponentRoot2, showInputModal } from "@/Components/InputModal"
import { useState } from "react"

interface PageProps {

}

const Page: React.FC<PageProps> = ({ }) => {

  const [input, setinput] = useState('')

  return (
    <>
      <div className="bg-[#303030] h-full w-full flex">
        <div className="m-auto flex flex-col gap-4 items-center">
          <div className="flex gap-12 items-center">
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={(e) => showMyPopup(e, 'Popup')}>
              Popup
            </button>
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={() => showMenu('MenuComponent')}>
              Menu
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
          {input && <p className="text-white max-w-[10rem] text-ellipsis overflow-hidden text-center text-nowrap break-keep" onClick={() => showToast('Holi!')}>
            Input: {input}
          </p>}
        </div>
      </div >
      <ModalRoot animation='bubble' />
      <InputComponentRoot animation='bubble' config={{ TestComponent: { animation: 'fade' } }} />
      <InputComponentRoot2 />
      <PopupRoot animation='pop' />
      <TooltipRoot animation={TooltipAnimation} />
      <MenuRoot animation={MenuAnimation} />
      <ToastRoot animation={ToastAnimation} />
    </>
  )
}
export default Page

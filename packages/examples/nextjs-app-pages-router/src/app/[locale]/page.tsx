"use client"
import { ModalRoot } from "decl-modal/react"
import { ModalFactory, ModalProps, throttle } from "decl-modal"
import { TooltipRoot, modalTooltip } from "@/Components/Tooltip/TooltipRoot"
import { InputComponentRoot, InputComponentRoot2, showInputModal } from "@/Components/InputModal"
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

const firstFactory = ModalFactory.generate(MyFirstModal)


interface PageProps {

}

const showTooltip = throttle(async (e: MouseEvent) => {
  await modalTooltip.show({ target: e.target as HTMLElement }, { override: false })
}) as any

const Page: React.FC<PageProps> = ({ }) => {

  const [input, setinput] = useState('')

  return (
    <>
      <div className="bg-[#303030] h-full w-full flex">
        <div className="m-auto flex flex-col gap-4 items-center">
          <div className="flex gap-12 items-center">
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={() => firstFactory.show({}, { animation: 'bubble' })}>
              Modal
            </button>
            <p className="text-white" onMouseEnter={showTooltip}>
              Tooltip | Popup
            </p>
            <button className="bg-black rounded-md py-2 px-4 font-bold text-white" onClick={async () => {
              const { response } = await showInputModal('TestComponent', { myProp: 'holi' })
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
      <ModalRoot modalFactory={firstFactory} animation='bubble' />
      <InputComponentRoot config={{ TestComponent: { animation: 'bubble' } }} />
      <InputComponentRoot2 />
      <TooltipRoot />
    </>
  )
}
export default Page

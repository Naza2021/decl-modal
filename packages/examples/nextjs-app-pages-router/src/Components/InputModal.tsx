import { ModalFactory, ModalProps } from "decl-modal"
import { MyGenericContainer } from "./ModalPopUpContainer"
import { generateModal } from "decl-modal/react"
import React from "react"

interface TestComponentProps extends ModalProps<string | false> {
  myProp?: 'holi'
}

interface TestComponentProps2 extends ModalProps<'sex'> {
  myProp2?: 'holi'
}


const TestComponent: React.FC<TestComponentProps> = ({ sendMessage, closeModal }) => {

  return (
    <MyGenericContainer>
      <div className="p-5 bg-white rounded-md flex flex-col">
        <h1 className="font-bold">Input:</h1>
        <input className="p-2 font-bold border border-solid border-black rounded-[4px]" id='my-modal-input' />
        <button className="bg-black rounded-md py-2 px-8 font-bold text-white self-end mt-4" onClick={() => {
          sendMessage((document.querySelector(`#my-modal-input`) as HTMLInputElement).value)
          closeModal()
        }}>
          Ok k k
        </button>
      </div>
    </MyGenericContainer>
  )
}


export const [showInputModal, InputComponentRoot] = generateModal({ Modals: { TestComponent, sex: {} as React.FC<{message: 'holi 2'}> } })
export const [showInputModal2, InputComponentRoot2] = generateModal(TestComponent)

// showInputModal('sex', { myProp2: 'holi' })
import { ModalProps } from "decl-modal"
import { generateModal } from "decl-modal/react"
import React from "react"
import { MyGenericContainer } from "./ModalPopUpContainer"

interface TestComponentProps extends ModalProps<string | false> {
  myProp?: 'holi'
}


const TestComponent: React.FC<TestComponentProps> = ({ closeModal }) => {

  return (
    <MyGenericContainer>
      <div className="p-5 bg-white rounded-md flex flex-col">
        <h1 className="font-bold">Input:</h1>
        <input className="p-2 font-bold border border-solid border-black rounded-[0.25rem]" id='my-modal-input' />
        <button className="bg-black rounded-md py-2 px-8 font-bold text-white self-end mt-4" onClick={() => {
          closeModal((document.querySelector(`#my-modal-input`) as HTMLInputElement).value)
        }}>
          Ok
        </button>
      </div>
    </MyGenericContainer>
  )
}


export const [showInputModal, InputComponentRoot] = generateModal({ Modals: { TestComponent, TestComponent2: TestComponent } })
export const [showInputModal2, InputComponentRoot2] = generateModal(TestComponent)

// showInputModal('sex', { myProp2: 'holi' })
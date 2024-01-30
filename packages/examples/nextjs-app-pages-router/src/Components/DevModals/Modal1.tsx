import { ModalFactory, ModalProps } from "decl-modal"
import { ModalPopUpContainer } from "../ModalPopUpContainer"

interface TestComponentProps extends ModalProps<boolean> {
  exacly: 'exacto!'
}

const TestComponent: React.FC<TestComponentProps> = (props) => {

  return (
    <ModalPopUpContainer {...props}>
      <div className="p-5 bg-white rounded-md">
        <h1 className="font-bold">Holi! 1 2 3 4</h1>
      </div>
    </ModalPopUpContainer>
  )
}

interface Exacto2Props {
  message: 'holi'
}

const Exacto2 = ({ }: Exacto2Props) => {
  return (
    <div> Exacto2 </div>
  )
}

interface Exacto3Props extends ModalProps<boolean> {
  message: string
}

function Exacto3(props: Exacto3Props) {
  return (
    <ModalPopUpContainer {...props}>
      <div className="bg-white rounded-md p-5 font-bold"> {props.message} </div>
    </ModalPopUpContainer>
  )
}

// import { ModalFactory } from "decl-modal"
// import type { ModalProps } from "decl-modal/react"

// const Modal1: React.FC<ModalProps> = ({ }) => {
//   return (
//     <ModalPopUpContainer>
//       <div className="bg-white rounded-md p-5 font-bold">
//         Hola desde Modal1!
//       </div>
//     </ModalPopUpContainer>
//   )
// }

// const Modal2: React.FC<ModalProps> = ({ }) => {
//   return (
//     <ModalPopUpContainer>
//       <div className="bg-white rounded-md p-5 font-bold">
//         Hola desde Modal2!
//       </div>
//     </ModalPopUpContainer>
//   )
// }

const myModals = new ModalFactory({ Modals: { Modal1, Modal2 } })
myModals.show('Modal1', {})
const { response } = await myModals.show('Modal2', {})


export { type TestComponentProps, TestComponent, type Exacto2Props, Exacto2, type Exacto3Props, Exacto3 }
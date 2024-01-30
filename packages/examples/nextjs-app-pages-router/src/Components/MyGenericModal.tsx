import { ModalFactory, ModalProps } from "decl-modal"
import { ModalPopUpContainer } from "decl-modal/react"


export interface MyGenericModalProps extends ModalProps<'ResponseType'> {
  myProp: string
}

export const MyGenericModal: React.FC<MyGenericModalProps> = ({ myProp }) => {

  return (
    <ModalPopUpContainer>
      <div className="flex justify-center p-5 rounded-md bg-white h-full w-[300px] -ml-4 pl-9">
        <p className='font-bold text-center'>{myProp}</p>
      </div>
    </ModalPopUpContainer>
  )
}

export const myGenericModal = ModalFactory.generate(MyGenericModal)

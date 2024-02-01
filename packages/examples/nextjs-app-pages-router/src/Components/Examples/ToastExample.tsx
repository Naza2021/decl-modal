import { type ModalProps } from "decl-modal"
import { type AnimConfig, generateModal, useModalProps } from "decl-modal/react"
import { useEffect } from "react"

export const ToastAnimation = {
  // container: {
  //   keyframes: {
  //     transform: ['translateX(100%)', 'translateX(0%)']
  //   },
  //   config: { duration: 300, easing: 'cubic-bezier(.17,.67,.32,.96)', reverse: true }
  // },
  // back: {
  //   config: { duration: 300 }
  // }
} satisfies AnimConfig

interface ToastComponentProps extends ModalProps<string | false> {
  content: string,
  timeout: number
}

const ToastComponent: React.FC<ToastComponentProps> = ({ content, closeModal, timeout }) => {

  // Auto close effect
  useEffect(() => {
    const time = setTimeout(() => {
      closeModal()
    }, timeout);

    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <div data-modal-type='back'>
      <div className="p-5 bg-white flex flex-col h-auto w-[12.5rem] rounded-md" onClick={() => closeModal()} data-modal-type='container'>
        <h1 className="font-bold">{content}</h1>
      </div>
    </div>
  )
}


const [showMethod, ModalRoot] = generateModal({ Modals: { ToastComponent } })

// Wrapper showMethod easy use
const showToast = (msg: ToastComponentProps['content'], config: Omit<ToastComponentProps, keyof ModalProps | 'content'> = { timeout: 30000 }) => {
  showMethod('ToastComponent', { content: msg, ...config }, { override: false })
}

type ToastRootProps = Parameters<typeof ModalRoot>[0] & {

}

const ToastRoot: React.FC<ToastRootProps> = (props) => {
  return (
    <div className="flex flex-col gap-6 fixed top-0 left-0 transition-all duration-300 p-6">
      <ModalRoot {...props} />
    </div>
  )
}


export { showToast, ToastRoot }
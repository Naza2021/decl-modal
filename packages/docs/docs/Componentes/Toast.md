```tsx
import { type ModalProps } from "decl-modal"
import { generateModal, type AnimConfig, useModalProps } from "decl-modal/react"
import React, { useEffect, useId, useRef } from "react"

export const ToastAnimation = {
  back: {
    config: {
      reverse: (id) => {
        const parentElement = document.querySelector(id) as HTMLDivElement
        Object.assign(parentElement.style, { overflow: 'hidden' })

        parentElement.animate({
          opacity: [1, 0],
        }, { duration: 150, fill: 'forwards' })

        return {
          keyframes: {
            maxHeight: [`${parentElement?.offsetHeight}px`, '0px'],
            paddingTop: [`${parentElement.style.paddingTop}px`, '0px']
          },
          config: { duration: 300, delay: 150 }
        }
      }
    }
  }
} satisfies AnimConfig

interface ToastContainerProps {
  children: React.ReactNode;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {

  const { closeModal, timeout } = useModalProps<ToastComponentProps>()
  const loadingRef = useRef<HTMLDivElement | null>(null)

  // Auto close effect
  useEffect(() => {

    if (!timeout) return

    loadingRef.current?.animate({
      transform: ['scaleX(100%)', 'scaleX(0%)']
    }, { duration: timeout, fill: 'forwards' })

    const time = setTimeout(() => {
      closeModal()
    }, timeout);

    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <div className="pt-6" data-modal-type='back'>
      <div className="bg-white flex flex-col h-auto min-w-max w-[12.5rem] rounded-md cursor-pointer overflow-hidden" onClick={() => closeModal()} data-modal-type='container'>
        {children}
        {timeout && <div className="h-[6px] bg-[#0096d1] w-full origin-left" ref={loadingRef} />}
      </div>
    </div>
  )
}


interface ToastComponentProps extends ModalProps<string | false> {
  content: string,
  timeout: number
}

const ToastComponent: React.FC<ToastComponentProps> = ({ content }) => {

  const id = useId()

  return <ToastContainer>
    <h1 className="font-bold p-5">{content}{` - ID: ${id}`}</h1>
  </ToastContainer>

}

const [showMethod, ModalRoot] = generateModal({ Modals: { ToastComponent } })

// Wrapper showMethod easy use
const showToast = (msg: ToastComponentProps['content'], config: Omit<ToastComponentProps, keyof ModalProps | 'content'> = { timeout: 3000 }) => {
  showMethod('ToastComponent', { content: msg, ...config }, { override: false })
}

type ToastRootProps = Parameters<typeof ModalRoot>[0] & {

}

const ToastRoot: React.FC<ToastRootProps> = (props) => {
  return (
    <div className="flex flex-col justify-center fixed left-1/2 -translate-x-1/2 top-0 transition-all duration-300">
      <ModalRoot {...props} />
    </div>
  )
}

export { ToastRoot, showToast }
```
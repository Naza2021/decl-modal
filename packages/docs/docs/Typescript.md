# Typescript
Diferentes metodos o formas para obtener un tipado fuerte en todas tus vistas.

#### ModalProps
Todos los modales deben extender de estas props para obtener los tipados de closeModal

#### useModalProps
Puedes tipar las props pasandole como argumento ModalProps o tal cual el modalPadre

#### AnimConfig
Tipado como definir animaciones

<!-- :::tip
Para darle tipado a esta comunicacion los Modales deben extender de <Highlight>ModalProps</Highlight> el cual su primer parametro de typescript es el tipado que van a tener los metodos para el envio, como el recibimiento de los mensajes. El tipado es compartido para ambas partes. Algo como:<br/>
```tsx
import { type ModalProps } from "decl-modal/react"
interface MyComponent extends ModalProps<{message: string}>
```
::: -->
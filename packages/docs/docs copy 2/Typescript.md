# Typescript
Diferentes metodos o formas para obtener un tipado fuerte en todas tus vistas.

#### ModalProps
Todos los modales deben extender de estas props para obtener los tipados de closeModal
```typescript
interface myModalType extends ModalProps {}

const MyComponent = (props: myModalType)...

// Puedes tipar la comunicacion de waitFor, sendMessage, pasandole como argumento el tipado:
interface myModalType extends ModalProps<{message: string}> {}
```

#### useModalProps
Puedes tipar las props pasandole como argumento ModalProps o tal cual el tipado que van tener los waitFor, sendMessage

```typescript
interface myModalType extends ModalProps {}
useModalProps<myModalType>()

// O
useModalProps<{message: string}>()
```

#### AnimConfig
Tipado como definir animaciones
```tsx 
const myCustomAnim = {
    // Tu animacion...
} satisfies AnimConfig
```

#### ModalRoot
Los ModalRoot automaticamente absorven el tipado de generateModal, si se genera un Root con multiples modales, las props de estos modales van a combinarse hacia el root.
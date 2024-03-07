# Typescript

Different methods or ways to obtain strong typing in all your views.

#### ModalProps

All modals should extend from these props to obtain the types of closeModal

```typescript
interface myModalType extends ModalProps {}

const MyComponent = (props: myModalType)...

// You can type the communication of waitFor, sendMessage, passing the type as an argument:
interface myModalType extends ModalProps<{message: string}> {}
```

#### useModalProps

You can type the props by passing ModalProps or the typing that waitFor, sendMessage will have as an argument

```typescript
interface myModalType extends ModalProps {}
useModalProps<myModalType>();

// Or
useModalProps<{ message: string }>();
```

#### AnimConfig

Typed to define animations

```tsx
const myCustomAnim = {
    // Your animation...
} satisfies AnimConfig
```

#### ModalRoot

ModalRoots automatically absorb the typing of generateModal, if a Root with multiple modals is generated, the props of these modals will be combined into the root.

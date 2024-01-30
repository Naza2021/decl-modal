## Vistas

<div align='center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
```mermaid
graph TD;
    ModalRoot-->ModalContainerA;
    ModalRoot-->ModalContainerB;
    ModalContainerA-->ModalA;
    ModalContainerB-->ModalB;
```

```mermaid
graph TD;
    ModalRoot-->ModalA;
    ModalRoot-->ModalB;
```
</div>

### ModalRoot

Ubicacion donde se van a renderizar los Modalcontainer.

#### Props

##### modalFactory
El ModalRoot requiere un modalFactory, para saber que tipo de vista va a redenrizar puedes ver como generar estas factorys en el siguiente link.

##### animation
Hay un lista de animaciones por defecto, pero puedes definir la animacion que gustes! Por defecto cualquier animacion que declares va a extender de la animacion fade, por lo tanto la animacion va a tener ciertas props por default, ejemplo una duracion de 300ms, pero obviamente puedes redifinir todo a tu gusto.

##### state
Mediante esta prop puedes compartir estado del padre donde se renderice el ModalRoot hacia las vistas (ModalContainers-Modals).
No recomiendo el uso de esta prop, idealmente pasarle las props necesarias via el Show method, o utilizar distintas tecnicas de estado, como swr, react-query, zustand, redux, etc.

#### Ejemplo

```tsx
import { ModalRoot } from "decl-modal/react"

//Render
<ModalRoot modalFactory={myGenericModal} animation='fade' />
```

### ModalContainer
Esta tipo de Component no es estrictamente necesario, ya que los Modal pueden tener definido en si mismo un ModalContainer. La idea de este componente es si van a renderizar distintos modales con un tipo de vista especifico, utilizarlos, como un "Layout".<br/>
Los ModalContainer definen el como se va a renderizar las vistas, por ejemplo en un modal tipico, mostrar un fondo con opacidad y una vista centrada.<br/>
#### Ejemplo
```tsx
import { ModalPopUpContainer } from "decl-modal/react"

//Render
<ModalPopUpContainer>
  {children}
</ModalPopUpContainer>
```
La idea de esta libreria es no proveer ningun tipo de UI para que puedas montar cualquier tipo de vista, sin depender de ninguna prop especifica. Por lo tanto puedes montar tus propios ModalContainer.

### Modal
Los modales ya son como tal la vista final que se renderiza, el contenido del mismo modal, los Modal en si tambien pueden ser ModalContainers, no tienen por que estas 2 ui estar separadas.
import { ModalFactory } from 'decl-modal'
import { Exacto2, TestComponent, Exacto3 } from './Modal1'

const Modals = {
  TestComponent,
  Exacto2,
  Exacto3
}

export const devModals = new ModalFactory({ Modals })
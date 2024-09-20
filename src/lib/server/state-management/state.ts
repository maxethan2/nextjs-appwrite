import { produce } from 'immer'
import {create} from 'zustand'

interface UserState {
  profilePicUrl: string,
  user: User,
  // update: (newProfilePic: string) => void
  updateName: (newName: string) => void
}

interface TodoListState  {
  todoList: Todo[] | null
}

export const useUserState = create<UserState>()((set) => ({
  profilePicUrl: '',
  user: {
    $id: 'none',
    $createdAt: 'none',
    $updatedAt: 'none',
    accessedAt: 'none',
    email: 'none',
    emailVerification: false,
    labels: [],
    mfa: false,
    name: 'none',
    passwordUpdate: 'none',
    phone: 'none',
    phoneVerification: false,
    prefs: [],
    registration: 'none',
    status: false,
    targets: [],
  },
  // user immer to update nested state
  updateName: (newName) => set(produce((state: UserState) => {state.user.name = newName}))
  // update: (newProfilePic) => set({profilePicUrl: newProfilePic})
}))

export const useTodoListState = create<TodoListState>()((set) => ({
  todoList: null
}))
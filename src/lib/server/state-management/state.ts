import {create} from 'zustand'

interface UserState {
  profilePicUrl: string,
  user: User,
  update: (newProfilePic: string) => void
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
  update: (newProfilePic) => set({profilePicUrl: newProfilePic})
}))

export const useTodoListState = create<TodoListState>()((set) => ({
  todoList: null
}))
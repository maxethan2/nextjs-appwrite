import {create} from 'zustand'

interface UserState {
  profilePicUrl: string,
  name: string,
  email: string,
  update: (newProfilePic: string) => void
}

export const useUserState = create<UserState>()((set) => ({
  profilePicUrl: '',
  name: '',
  email: '',
  update: (newProfilePic) => set({profilePicUrl: newProfilePic})
}))
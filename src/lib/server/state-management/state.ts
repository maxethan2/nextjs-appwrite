import {create} from 'zustand'

interface UserState {
  profilePicUrl: string,
  update: (newProfilePic: string) => void
}

export const useUserState = create<UserState>()((set) => ({
  profilePicUrl: '',
  update: (newProfilePic) => set({profilePicUrl: newProfilePic})
}))
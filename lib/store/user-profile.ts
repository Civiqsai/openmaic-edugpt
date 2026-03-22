/**
 * User Profile Store
 * Persists avatar, nickname & bio to localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BP = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Predefined avatar options */
export const AVATAR_OPTIONS = [
  `${BP}/avatars/user.png`,
  `${BP}/avatars/teacher-2.png`,
  `${BP}/avatars/assist-2.png`,
  `${BP}/avatars/clown-2.png`,
  `${BP}/avatars/curious-2.png`,
  `${BP}/avatars/note-taker-2.png`,
  `${BP}/avatars/thinker-2.png`,
] as const;

export interface UserProfileState {
  /** Local avatar path or data-URL (for custom uploads) */
  avatar: string;
  nickname: string;
  bio: string;
  setAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
  setBio: (bio: string) => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      avatar: AVATAR_OPTIONS[0],
      nickname: '',
      bio: '',
      setAvatar: (avatar) => set({ avatar }),
      setNickname: (nickname) => set({ nickname }),
      setBio: (bio) => set({ bio }),
    }),
    {
      name: 'user-profile-storage',
    },
  ),
);

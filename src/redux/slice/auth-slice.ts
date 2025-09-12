import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole, staticUsers } from '../../constants/static-data';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  assignedRestaurant?: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginWithCredentials: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      const { email, password } = action.payload;
      const user = staticUsers.find(
        u => u.email === email && u.password === password,
      );

      if (user) {
        state.isAuthenticated = true;
        state.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          assignedRestaurant: user.assignedRestaurant,
        };
        state.token = `token_${user.id}_${Date.now()}`;
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, loginWithCredentials, logout, updateProfile } =
  authSlice.actions;
export default authSlice.reducer;

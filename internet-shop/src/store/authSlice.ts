import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
    _id: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("token");
        }
    }
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

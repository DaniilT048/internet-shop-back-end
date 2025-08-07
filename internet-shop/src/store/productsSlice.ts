import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: { category?: string; sort?: 'asc' | 'desc' }) => {
        const query = new URLSearchParams();
        if (params.category) query.append('category', params.category);
        if (params.sort) query.append('sort', params.sort);

        const response = await axios.get(`http://localhost:4000/api/products?${query.toString()}`);
        return response.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    } as {
        items: any[];
        loading: boolean;
        error: string | null;
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error download products';
            });
    },
});

export default productsSlice.reducer;

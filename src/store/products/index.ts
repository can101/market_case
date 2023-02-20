import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct, IProductState } from '@/types';
import { getAllProductsAsyncThunk } from './getAllProductsAsyncThunk';

const initialState: IProductState = {
    items: [],
    loading: false,
    notfound: false,
    error: '',
    temp: [],
};

export type Params = 'name' | 'price' | 'category';

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterProductsCategory: (state: IProductState, action: PayloadAction<{ category: string }>) => {
            const { category } = action.payload;
            if (category === 'All') {
                state.items = state.temp;
                return;
            }
            state.items = state.temp.filter(e => e.category === category);
        },
        sortByPrameters: (state: IProductState, action: PayloadAction<{ params: Params, isReverse: boolean }>) => {
            const params = action.payload.params || 'name';
            const response: IProduct[] = state.items.sort((a: IProduct, b: IProduct) => {
                if (a[params] > b[params]) {
                    return 1;
                }
                if (a[params] < b[params]) {
                    return -1;
                }
                return 0;
            });
            if (action.payload.isReverse) {
                state.items = response.reverse();
                return;
            }
            state.items = response;
        },
        searchProductName: (state: IProductState, action: PayloadAction<{ text: string }>) => {
            const regex = new RegExp(action.payload.text, 'i');
            const res = state.temp.filter(e => regex.test(e.name));
            state.items = res;
            state.notfound = res.length === 0;
        },
        toogleIsFavorite(state: IProductState, action: PayloadAction<{ product: IProduct }>) {
            const productIndex = state.items.findIndex(e => e.id === action.payload.product.id);
            state.items[productIndex].isFavorite = !state.items[productIndex].isFavorite;
            state.temp[productIndex].isFavorite = !state.temp[productIndex].isFavorite;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductsAsyncThunk.pending, (state) => {
            state.loading = true;
        }).addCase(getAllProductsAsyncThunk.fulfilled, (state, action) => {
            state.items = state.temp = action.payload;
            state.loading = false;
            state.error = '';
        }).addCase(getAllProductsAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.error?.message ?? '';
        });
    }
});

export const actions = productSlice.actions;
export default productSlice.reducer;

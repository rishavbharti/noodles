import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  brands: [],
  countries: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json'
    );
    const data = await response.json();

    return data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';

        const productsByCountries = {};
        const productsByBrands = {};

        const organizeByCountryBrands = (product) => {
          if (
            productsByCountries[product.Country].brands.hasOwnProperty(
              product.Brand
            )
          ) {
            productsByCountries[product.Country].brands[product.Brand].push(
              product
            );
          } else {
            productsByCountries[product.Country].brands[product.Brand] = [];
            productsByCountries[product.Country].brands[product.Brand].push(
              product
            );
          }

          productsByCountries[product.Country].products.push(product);
        };

        const organizeByCountry = (product) => {
          if (productsByCountries.hasOwnProperty(product.Country)) {
            organizeByCountryBrands(product);
          } else {
            productsByCountries[product.Country] = {
              brands: {},
              products: [],
            };
            organizeByCountryBrands(product);
          }
        };

        const organizeByBrands = (product) => {
          if (productsByBrands.hasOwnProperty(product.Brand)) {
            productsByBrands[product.Brand].push(product);
          } else {
            productsByBrands[product.Brand] = [];
            productsByBrands[product.Brand].push(product);
          }
        };

        action.payload.forEach((product) => {
          organizeByBrands(product);
          organizeByCountry(product);
        });

        state.brands = productsByBrands;
        state.countries = productsByCountries;
        state.totalProducts = action.payload.length;
      });
  },
});

export default productsSlice.reducer;
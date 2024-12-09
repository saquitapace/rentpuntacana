import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the structure of the currency state
interface CurrencyState {
  currencies: Record<string, string>;
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  currencies: {},
  isLoading: false,
  error: null,
};

// Async thunk to fetch currencies
export const fetchCurrencies = createAsyncThunk<
  Record<string, string>,
  string,
  { rejectValue: string }
>(
  "currencies/fetchCurrencies",
  async (currency: string, { rejectWithValue }) => {
    try {
      const options =  {
        method: 'GET',
        redirect: 'follow'
      }
      const response = await axios.get( "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a79f09459df649bb93b9e56a9fefbdc4&symbols=EUR,CAD,USD,DOP,AUD,INR,GBP", options);
         
      if (response) {
        const currenciesObject = response.data;
        //console.log(currenciesObject)

        localStorage.setItem("currencies", JSON.stringify(currenciesObject));  
        return currenciesObject;
      } else {
        return rejectWithValue("No currency found");
      }
    } catch (error: any) {
      console.error("Error fetching currencies:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create currencies slice
const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setCurrencyPreference(state, action: PayloadAction<string>) {
      console.log("setting local storage");
      console.log(action.payload)
      localStorage.setItem("currPref", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrencies.fulfilled,
        (state, action: PayloadAction<Record<string, string>>) => {
          state.isLoading = false;
          state.currencies = action.payload;
        }
      )
      .addCase(fetchCurrencies.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setCurrencyPreference } = currenciesSlice.actions;
export default currenciesSlice.reducer;
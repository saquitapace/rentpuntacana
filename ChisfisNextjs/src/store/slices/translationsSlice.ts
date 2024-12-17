import { getDefaultTranslations } from "@/utils/helpers";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the structure of the translations state
interface TranslationsState {
  translations: Record<string, string>;
  isLoading: boolean;
  error: string | null;
}

const defaultTranslations = getDefaultTranslations();//@ezra

const initialState: TranslationsState = {
  translations: defaultTranslations || {},
  isLoading: false,
  error: null,
};

// Async thunk to fetch translations
export const fetchTranslations = createAsyncThunk<
  Record<string, string>,
  string,
  { rejectValue: string }
>(
  "translations/fetchTranslations",
  async (language: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/translations/${language}/get`
      );

      if (response.data?.[0]) {
        const translationsArray = response.data[0];
        const translationsObject = translationsArray.reduce(
          (acc: Record<string, string>, item: { ky: string; string: string }) => {
            acc[item.ky] = item.string;
            return acc;
          },
          {}
        );

        localStorage.setItem("translations3", JSON.stringify( translationsObject ));
        return translationsObject;
      } else {
        return rejectWithValue("No translations found");
      }
    } catch (error: any) {
      console.error("Error fetching translations:", error); 
      //return rejectWithValue(error.message);
      return defaultTranslations;   //@ezra
    }
  }
);

// Create translations slice
const translationsSlice = createSlice({
  name: "translations",
  initialState,
  reducers: {
    setLanguagePreference(state, action: PayloadAction<string>) {
      localStorage.setItem("langPref", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTranslations.fulfilled,
        (state, action: PayloadAction<Record<string, string>>) => {
          state.isLoading = false;
          state.translations = action.payload;
        }
      )
      .addCase(fetchTranslations.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setLanguagePreference } = translationsSlice.actions;
export default translationsSlice.reducer;
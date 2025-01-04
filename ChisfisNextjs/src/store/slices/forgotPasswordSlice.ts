import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MailSlurp } from 'mailslurp-client';

export interface ForgotPasswordState {
   isLoading: boolean;
   success: boolean;
   error: string | null;
}

const initialState: ForgotPasswordState = {
   isLoading: false,
   success: false,
   error: null,
};

export const forgotPassword = createAsyncThunk(
'forgotPassword/submit',
   async (email: string, { rejectWithValue }) => {
      try {
         const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`, { email }
         );
         return response.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.message);
      }
   }
);

async function createInbox() {
   const API_KEY = "e6209418fb671c31e08b51eef5152bb840b3fc4f0500a4a9e5621e7ce7115eec";

   // call MailSlurp createInbox endpoint
   return await axios
   .post(`https://api.mailslurp.com/createInbox?apiKey=${API_KEY}`)
   .then((res) => res.data);
}
export const sendForgotPasswordEmail = createAsyncThunk(
'forgotPassword/sendEmail',
   async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
      try {
         //TODO: Refactor codes
         
         const API_KEY = "e6209418fb671c31e08b51eef5152bb840b3fc4f0500a4a9e5621e7ce7115eec";
         console.log(email, password);
         
         const mailslurp = new MailSlurp({ apiKey: "e6209418fb671c31e08b51eef5152bb840b3fc4f0500a4a9e5621e7ce7115eec" });
         
   

         await axios({
            method: "POST",
            url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
            data: {
            to: "saquitab@gmail.com",
            subject: "Password Reset Request",
            body: "We received a request to reset your password. " +
            "If you didn't make this request, please contact customer support for assistance."
            +"Otherwise, your temporary password is:" + password +"",
            },
         }).then((response) => {
            console.log(response);
            if(response.status=== 201){
              return "Email Successfully Sent";
            }
         });
      } catch (error: any) {
         return rejectWithValue(error.response.data.message);
      }
   }
);

const forgotPasswordSlice = createSlice({
   name: 'forgotPassword',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
      .addCase(forgotPassword.pending, (state) => {
         state.isLoading = true;
         state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
         state.isLoading = false;
         state.success = true;
         state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
         state.isLoading = false;
         state.success = false;
         state.error = action.payload as string;
      })
      // Handle sending email
      .addCase(sendForgotPasswordEmail.fulfilled, (state) => {
         state.success = true;
         state.error = null;
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
         state.error = action.payload as string;
      });
   },
});

export default forgotPasswordSlice.reducer;
import { RootState } from '@/app/store/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface DateEntry {
  date: string;
  startTime: string;
  endTime: string;
  hours: string;
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface formProps {
    client: string;
    workLocation: string;
    contractNumber: string;
    dateEntries: DateEntry[];
    totalHeuresSimple: string;
    totalHeuresDouble: string;
    totalVoyageSimple: string;
    totalVoyageDouble: string;
    materialTransported: string;
    autresPrecisions: string;
    ejesCamion: string;
    numeroCamion: string;
    transporteur: string;
    nomChauffeur: string;
    numeroPlaque: string
    signature: string;
}

export interface FormState {
    form: formProps | any;
    userInfo: UserInfo | null;
}

const initialState: FormState = {
    form: {
        client: '',
        workLocation: '',
        contractNumber: '',
        dateEntries: [{ date: '', startTime: '', endTime: '', hours: '' }],
        totalHeuresSimple: '',
        totalHeuresDouble: '',
        totalVoyageSimple: '',
        totalVoyageDouble: '',
        materialTransported: '',
        autresPrecisions: '',
        ejesCamion: '',
        numeroCamion: '',
        transporteur: '',
        nomChauffeur: '',
        numeroPlaque: '',
        signature: '',
    },
    userInfo: null
};

// handleCreationTimeSheet
export const handleCreationTimeSheet = createAsyncThunk(
    'handleCreationTimeSheet',
    async (data, thunkApi) => {
        try {


        } catch (error: any) {
            const message = error.message;
            return thunkApi.rejectWithValue(message);
        }}
)

// handleSubmitTimeSheet
export const handleSubmitTimeSheet = createAsyncThunk(
    'handleSubmitTimeSheet',
    async (data: any, thunkApi) => {
        try {
            const response = await axios.post('/api/timesheet', data.object);
            return response.data;
        } catch (error: any) {
            const message = error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
)


export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      SET_FORM_DATA: (state, action: PayloadAction<any>) => {
          state.form = action.payload;
      },
      UPDATE_FIELD: (state, action: PayloadAction<{ name: string; value: string }>) => {
          const { name, value } = action.payload;
          state.form[name] = value;
      },
      UPDATE_DATE_ENTRY: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
          const { index, field, value } = action.payload;
          state.form.dateEntries[index][field] = value;
      },
      ADD_DATE_ENTRY: (state) => {
          state.form.dateEntries.push({ date: '', startTime: '', endTime: '', hours: '' });
      },
      SET_USER_INFO: (state, action: PayloadAction<UserInfo>) => {
          state.userInfo = action.payload;
      },
    },
  });
  
  export const { 
      UPDATE_FIELD, 
      UPDATE_DATE_ENTRY, 
      ADD_DATE_ENTRY,
      SET_FORM_DATA,
      SET_USER_INFO
  } = formSlice.actions;

export const selectForm = (state: RootState) => state.form.form;
export const selectUserInfo = (state: RootState) => state.form.userInfo;

export default formSlice.reducer;
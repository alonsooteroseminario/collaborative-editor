import { RootState } from '@/app/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState = {
    favouriteApps: []
  };

export interface appSuiteState {
    favouriteApps: any 
} 

export const appSuiteSlice = createSlice({
    name: 'appSuite',
    initialState,
    reducers:{
        ADD_FAVOURITE: (state, action: PayloadAction<any>) => {
            // if(!state.favouriteApps.includes(action.payload)){
            //     state.favouriteApps.push(action.payload)
            // }
        },
        REMOVE_FAVOURITE: (state, action: PayloadAction<any>) => {
            // if(state.favouriteApps.includes(action.payload)){
            //     state.favouriteApps.pop(action.payload)
            // }
        },
    }
});

export const { 
    ADD_FAVOURITE, 
    REMOVE_FAVOURITE,
  } = appSuiteSlice.actions;

export const appSuite = (state: RootState) => state.appSuite;

export default appSuiteSlice.reducer;
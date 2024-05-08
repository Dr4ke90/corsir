import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const necesarSlice = createSlice({
  name: "necesar",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNecesar.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addFisaNecesar.fulfilled, (state, action) => {
      return [...state, action.payload];
    });

    builder.addCase(deleteFisaNecesar.fulfilled, (state, action) => {
      return state.filter((item) => item.fisa !== action.payload.fisa);
    });

    builder.addCase(updateFisa.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.fisa === action.payload.fisa
      );
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchNecesar = createAsyncThunk(
  "necesar/fetchNecesar",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/it/necesar"
      );
      return response.data;
    } catch (error) {
      throw new Error("Eroare la incarcarea fiselor", error);
    }
  }
);

export const addFisaNecesar = createAsyncThunk(
  "necesar/addFisaNecesar",
  async (fisaNecesar) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/it/necesar",
        fisaNecesar
      );

      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaNecesar.fisa} nu a putut fi adaugata !!!`
        );
        return;
      }
      console.log(
        response.status,
        response.data,
        `Fisa ${fisaNecesar.fisa} a fost adaugata cu succes!!!`
      );
      return fisaNecesar;
    } catch (error) {
      throw new Error("Eroare la actualizarea fisei ", fisaNecesar.fisa, error);
    }
  }
);

export const updateFisa = createAsyncThunk(
  "necesar/updateFisaNecesar",
  async (fisaNecesar) => {
    const updates = { ...fisaNecesar };
    delete updates._id;
    try {
      const response = await axios.put(
        `http://localhost:3000/coral/it/necesar/${fisaNecesar.fisa}`,
        updates
      );

      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaNecesar.fisa} nu a putut fi actualizata !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaNecesar.fisa} a fost actualizata cu succes!!!`
      );
      return fisaNecesar;
    } catch (error) {
      throw new Error("Eroare la actualizarea fisei ", fisaNecesar.pv, error);
    }
  }
);

export const deleteFisaNecesar = createAsyncThunk(
  "necesar/deleteFisaNecesar",
  async (fisaNecesar) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/it/necesar/${fisaNecesar.fisa}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaNecesar.fisa} nu a putut fi stearsa !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaNecesar.fisa} a fost stearsa cu succes!!!`
      );
      return fisaNecesar;
    } catch (error) {
      throw new Error("Eroare la actualizarea fisei ", fisaNecesar.pv, error);
    }
  }
);

export default necesarSlice.reducer;

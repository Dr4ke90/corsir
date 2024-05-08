import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const returSlice = createSlice({
  name: "retur",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFiseRetur.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addFisaRetur.fulfilled, (state, action) => {
      return [...state, action.payload];
    });

    builder.addCase(deleteFisaRetur.fulfilled, (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    });

    builder.addCase(updateFisaRetur.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.fisa === action.payload.fisa
      );
      if (indexToUpdate !== -1) {
        state.data[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchFiseRetur = createAsyncThunk(
  "retur/fetchFiseRetur",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/coral/it/retur");
      return response.data;
    } catch (error) {
      throw new Error("Eroare la upload-ul fiselor de retur", error);
    }
  }
);

export const addFisaRetur = createAsyncThunk(
  "retur/addFisaRetur",
  async (fisaRetur) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/it/retur",
        fisaRetur
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaRetur.fisa} nu a putut fi adaugata !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaRetur.fisa} a fost adaugata cu succes !!!`
      );
      return fisaRetur;
    } catch (error) {
      throw new Error("Eroare la adaugarea fisei " + fisaRetur.fisa, error);
    }
  }
);

export const updateFisaRetur = createAsyncThunk(
  "retur/updateFisaRetur",
  async (fisaRetur) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/coral/it/retur/${fisaRetur.fisa}`,
        fisaRetur
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaRetur.fisa} nu a putut fi actualizata !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaRetur.fisa} a fost actualizata cu succes !!!`
      );
      return fisaRetur;
    } catch (error) {
      throw new Error("Eroare la actualizarea fisei " + fisaRetur.fisa, error);
    }
  }
);

export const deleteFisaRetur = createAsyncThunk(
  "retur/deleteFisaRetur",
  async (fisaRetur) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/it/retur/${fisaRetur.fisa}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaRetur.fisa} nu a putut fi stearsa !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaRetur.fisa} a fost stearsa cu succes !!!`
      );
      return fisaRetur;
    } catch (error) {
      throw new Error("Eroare la stergerea fisei " + fisaRetur.fisa, error);
    }
  }
);

export default returSlice.reducer;

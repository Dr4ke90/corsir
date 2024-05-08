import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const predareSlice = createSlice({
  name: "predare",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFisePredare.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addFisaPredare.fulfilled, (state, action) => {
      return [...state, action.payload];
    });

    builder.addCase(deleteFisaPredare.fulfilled, (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    });

    builder.addCase(updateFisaPredare.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.fisa === action.payload.fisa
      );
      if (indexToUpdate !== -1) {
        state.data[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchFisePredare = createAsyncThunk(
  "predare/fetchFisePredare",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/it/predare"
      );
      console.log(response.data.succes);
      return response.data.response;
    } catch (error) {
      throw new Error("Eroare la incarcarea fiselor", error);
    }
  }
);

export const addFisaPredare = createAsyncThunk(
  "predare/addFisePredare",
  async (fisaPredare) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/it/predare",
        fisaPredare
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaPredare.fisa} nu a putut fi adaugata !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaPredare.fisa} a fost adaugata cu succes !!!`
      );
      return fisaPredare;
    } catch (error) {
      throw new Error("Eroare la crearea fisei" + fisaPredare.fisa, error);
    }
  }
);

export const updateFisaPredare = createAsyncThunk(
  "predare/updateFisaPredare",
  async (fisa) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/coral/it/predare/${fisa.fisa}`,
        fisa
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisa.fisa} nu a putut fi actualizata !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisa.fisa} a fost actualizata cu succes!!!`
      );
      return fisa;
    } catch (error) {
      throw new Error("Eroare la actualizarea fisei " + fisa.fisa, error);
    }
  }
);

export const deleteFisaPredare = createAsyncThunk(
  "predare/deleteFisePredare",
  async (fisa) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/it/predare/` + fisa.fisa
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisa.fisa} nu a putut fi stearsa !!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisa.fisa} a fost stearsa cu succes !!!`
      );
      return fisa;
    } catch (error) {
      throw new Error("Eroare la stergerea fisei " + fisa.fisa, error);
    }
  }
);

export default predareSlice.reducer;

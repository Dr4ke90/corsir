import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const returSlice = createSlice({
  name: "inventar",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventoryFiles.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addInventoryFile.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(deleteInventoryFile.fulfilled, (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    });
    builder.addCase(updateInventoryFile.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.fisa === action.payload.fisa
      );
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchInventoryFiles = createAsyncThunk(
  "inventar/fetchInventoryFiles",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/it/inventar"
      );
      return response.data;
    } catch (error) {
      throw new Error("Eroare la upload-ul fiselor de inventar", error);
    }
  }
);

export const addInventoryFile = createAsyncThunk(
  "inventar/addInventoryFile",
  async (fisaInventar) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/it/inventar",
        fisaInventar
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaInventar.fisa} nu a putut fi adaugata!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaInventar.fisa} a fost adaugata cu succes!!`
      );
      return fisaInventar;
    } catch (error) {
      throw new Error("Eroare la adaugarea fisei " + fisaInventar.fisa, error);
    }
  }
);

export const updateInventoryFile = createAsyncThunk(
  "inventar/updateInventoryFile",
  async (fisaInventar) => {
    delete fisaInventar._id;
    try {
      const response = await axios.put(
        `http://localhost:3000/coral/it/inventar/${fisaInventar.fisa}`,
        fisaInventar
      );

      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaInventar.fisa} nu a putut fi actualizata!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaInventar.fisa} a fost actualizata cu succes!!`
      );

      return fisaInventar;
    } catch (error) {
      throw new Error(
        "Eroare la actualizarea fisei " + fisaInventar.fisa,
        error
      );
    }
  }
);

export const deleteInventoryFile = createAsyncThunk(
  "inventar/deleteInventoryFile",
  async (fisaInventar) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/it/inventar/${fisaInventar.fisa}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Fisa ${fisaInventar.fisa} nu a putut fi stearsa!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Fisa ${fisaInventar.fisa} a fost stearsa cu succes!!`
      );

      return fisaInventar;
    } catch (error) {
      throw new Error("Eroare la stergerea fisei " + fisaInventar, error);
    }
  }
);

export default returSlice.reducer;

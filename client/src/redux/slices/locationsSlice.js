import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const locationsSlice = createSlice({
  name: "locations",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      return action.payload;
    });
    // builder.addCase(adaugaEchipament.fulfilled, (state, action) => {
    //   return [...state, action.payload];
    // });
    // builder.addCase(deleteEchipament.fulfilled, (state, action) => {
    //   return state.filter((eq) => eq.cit !== action.payload);
    // });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.proiect === action.payload.proiect
      );
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/api/locations"
      );
      console.log(`Locatiile au fost incarcate cu succes`);
      return response.data;
    } catch (error) {
      throw new Error("Eroare la incarcarea locatiilor", error);
    }
  }
);

export const updateLocation = createAsyncThunk(
  "locations/updateLocation",
  async (locatie) => {
    delete locatie._id
    try {
      const response = await axios.put(
        `http://localhost:3000/coral/api/locations/${locatie.proiect}`,
        locatie
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Locatia ${locatie.proiect} nu a putut fi actualizata!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Locatia ${locatie.proiect} a fost actualizata cu succes!!`
      );

      return locatie;
    } catch (error) {
      throw new Error("Eroare la actualizarea locatiei");
    }
  }
);

export const addLocation = createAsyncThunk(
  "locations/adaugaEchipament",
  async (locatie) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/api/locations",
        locatie
      );
      console.log(response.data.success);
      return locatie;
    } catch (error) {
      throw new Error("Eroare la adaugarea locatiei", error);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
  async (proiect) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/it/echipament/${proiect}`
      );
      console.log(response.data.message);
      return proiect;
    } catch (error) {
      throw new Error("Eroare la actualizarea locatiei ", proiect, error);
    }
  }
);

export default locationsSlice.reducer;

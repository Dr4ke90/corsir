import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const echipSlice = createSlice({
  name: "mobilePhones",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMobilePhones.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addMobilePhone.fulfilled, (state, action) => {
      return [...state, action.payload];
    });

    builder.addCase(deleteMobilePhone.fulfilled, (state, action) => {
      return state.filter((eq) => eq.id !== action.payload);
    });

    builder.addCase(updateMobilePhones.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchMobilePhones = createAsyncThunk(
  "mobilePhones/fetchMobilePhones",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/api/mobile-phones"
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          `Telefoanele nu au putut fi incarcate !!!`
        );
        return;
      }

      console.log(
        response.status,
        `Telefoanele au fost incarcate cu succes !!!`
      );
      return response.data;
    } catch (error) {
      throw new Error("Eroare la incarcarea telefoanenlor", error);
    }
  }
);

export const updateMobilePhones = createAsyncThunk(
  "mobilePhones/updateMobilePhones",
  async (phone) => {
    delete phone._id;
    try {
      const respons = await axios.put(
        `http://localhost:3000/coral/api/mobile-phones/${phone.id}`,
        phone
      );
      if (respons.status !== 200) {
        console.log(
          respons.status,
          respons.data,
          `Telefonul ${phone.id} nu a putut fi actualizat!!`
        );
        return;
      }

      console.log(
        respons.status,
        respons.data,
        `Telefonul ${phone.id} a fost actualizat cu succes!!`
      );
      return phone;
    } catch (error) {
      throw new Error("Eroare la actualizarea telefonului");
    }
  }
);

export const addMobilePhone = createAsyncThunk(
  "mobilePhones/addMobilePhone",
  async (phone) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/api/mobile-phones",
        phone
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Telefonul ${phone.id} nu a putut fi adaugat!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Telefonul ${phone.id} a fost adaugat cu succes!!`
      );
      return phone;
    } catch (error) {
      throw new Error("Eroare la adaugarea telefonului", error);
    }
  }
);

export const deleteMobilePhone = createAsyncThunk(
  "mobilePhones/deleteMobilePhone",
  async (phoneId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/api/mobile-phones/${phoneId}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          `Telefonul ${phoneId} nu a putut fi sters!!`
        );
        return;
      }

      console.log(
        response.status,
        `Telefonul ${phoneId} a fost sters cu succes!!`
      );
      return phoneId;
    } catch (error) {
      throw new Error("Eroare la actualizarea telefonului ", phoneId, error);
    }
  }
);

export default echipSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const echipSlice = createSlice({
  name: "workEquipment",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkEquipmentList.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addWorkEquipment.fulfilled, (state, action) => {
      return [...state, action.payload];
    });

    builder.addCase(deleteWorkEquipment.fulfilled, (state, action) => {
      return state.filter((eq) => eq.id !== action.payload);
    });

    builder.addCase(updateWorkEquipment.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchWorkEquipmentList = createAsyncThunk(
  "workEquipment/fetchWorkEquipment",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/api/work-equipment"
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          `Echipamentele nu au putut fi incarcate !!!`
        );
        return [];
      }

      console.log(
        response.status,
        `Echipamentele au fost incarcate cu succes !!!`
      );
      return response.data;
    } catch (error) {
      throw new Error("Eroare la incarcarea Echipamentele", error);
    }
  }
);

export const updateWorkEquipment = createAsyncThunk(
  "workEquipment/updateWorkEquipment",
  async (equipment) => {
    delete equipment._id;
    try {
      const respons = await axios.put(
        `http://localhost:3000/coral/api/work-equipment/${equipment.id}`,
        equipment
      );
      if (respons.status !== 200) {
        console.log(
          respons.status,
          respons.data,
          `Echipamentul ${equipment.id} nu a putut fi actualizat!!`
        );
        return;
      }

      console.log(
        respons.status,
        respons.data,
        `Echipamentul ${equipment.id} a fost actualizat cu succes!!`
      );
      return equipment;
    } catch (error) {
      throw new Error("Eroare la actualizarea Echipamentului");
    }
  }
);

export const addWorkEquipment = createAsyncThunk(
  "workEquipment/addWorkEquipment",
  async (equipment) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/api/work-equipment",
        equipment
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Echipamentul ${equipment.id} nu a putut fi adaugat!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Echipamentul ${equipment.id} a fost adaugat cu succes!!`
      );
      return equipment;
    } catch (error) {
      throw new Error("Eroare la adaugarea Echipamentului", error);
    }
  }
);


export const deleteWorkEquipment = createAsyncThunk(
  "workEquipment/deleteWorkEquipment",
  async (eqFile) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/api/work-equipment/${eqFile}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          `Echipamentul ${eqFile} nu a putut fi sters!!`
        );
        return;
      }

      console.log(
        response.status,
        `Echipamentul ${eqFile} a fost sters cu succes!!`
      );
      return eqFile;
    } catch (error) {
      throw new Error("Eroare la actualizarea Echipamentului ", eqFile, error);
    }
  }
);

export default echipSlice.reducer;

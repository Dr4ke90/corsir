import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const echipSlice = createSlice({
  name: "echipament",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEchipament.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(adaugaEchipament.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(addEquipmentGroup.fulfilled, (state, action) => {
      return [...state, ...action.payload];
    });
    builder.addCase(deleteEchipament.fulfilled, (state, action) => {
      return state.filter((eq) => eq.id !== action.payload);
    });
    builder.addCase(updateEchipament.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate !== -1) {
        state[indexToUpdate] = action.payload;
      }
    });
  },
});

export const fetchEchipament = createAsyncThunk(
  "echipament/fetchEchipament",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/coral/it/echipament"
      );
      if (response.status !== 200) {
        console.log(
          response.status
          `Echipamentele nu au putut fi incarcate !!!`
        );
        return;
      }

      console.log(
        response.status,
        `Echipamentele au fost incarcate cu succes !!!`
      );
      return response.data;
    } catch (error) {
      throw new Error("Eroare la incarcarea Echipamentelor", error);
    }
  }
);

export const updateEchipament = createAsyncThunk(
  "echipament/updateEchipament",
  async (echipament) => {
    delete echipament._id;
    try {
      const respons = await axios.put(
        `http://localhost:3000/coral/it/echipament/${echipament.id}`,
        echipament
      );
      if (respons.status !== 200) {
        console.log(
          respons.status,
          respons.data,
          `Echipamentu nu a putut fi actualizat!!`
        );
        return;
      }

      console.log(
        respons.status,
        respons.data,
        `Echipamentul ${echipament.id} a fost actualizat cu succes!!`
      );
      return echipament;
    } catch (error) {
      throw new Error("Eroare la actualizarea echipamentului");
    }
  }
);

export const adaugaEchipament = createAsyncThunk(
  "echipament/adaugaEchipament",
  async (echipament) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/coral/it/echipament",
        echipament
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          response.data,
          `Echipamentu nu a putut fi adaugat!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Echipamentul ${echipament.id} a fost adaugat cu succes!!`
      );
      return echipament;
    } catch (error) {
      throw new Error("Eroare la adaugarea echipamentului", error);
    }
  }
);

export const addEquipmentGroup = createAsyncThunk(
  "echipament/addEquipmentGroup",
  async (equipmentList) => {
    try {
      await Promise.all(
        equipmentList.map(async (eq) => {
          const response = await axios.post(
            `http://localhost:3000/coral/it/echipament`,
            eq
          );

          if (response.status !== 200) {
            console.log(
              response.status,
              response.data,
              `Echipamentu nu a putut fi adaugat!!`
            );
            return;
          }

          console.log(
            response.status,
            response.data,
            `Echipamentul ${eq.id} a fost adaugat cu succes!!`
          );
        })
      );
      return equipmentList;
    } catch (error) {
      throw new Error("Eroare la adaugarea echipamentului", error);
    }
  }
);

export const updateEchipmentGroup = createAsyncThunk(
  "echipament/updateEquipmentGroup",
  async (eqList) => {
    try {
      const updatedEchipamentList = await Promise.all(
        eqList.map(async (eq) => {
          delete eq._id;
          const response = await axios.put(
            `http://localhost:3000/coral/it/echipament/${eq.id}`,
            eq
          );

          return response.data.message;
        })
      );

      console.log(updatedEchipamentList);
      return updatedEchipamentList;
    } catch (error) {
      console.error("Eroare la actualizarea grupului de echipamente:", error);
      throw error;
    }
  }
);

export const deleteEchipament = createAsyncThunk(
  "echipament/deleteEchipament",
  async (echipamentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/it/echipament/${echipamentId}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          `Echipamentul ${echipamentId} nu a putut fi sters!!`
        );
        return;
      }

      console.log(
        response.status,
        `Echipamentul ${echipamentId} a fost sters cu succes!!`
      );
      return echipamentId;
    } catch (error) {
      throw new Error(
        "Eroare la actualizarea echipamentului ",
        echipamentId,
        error
      );
    }
  }
);

export default echipSlice.reducer;

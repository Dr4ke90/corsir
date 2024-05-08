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
      return state.filter((eq) => eq.cit !== action.payload);
    });

    builder.addCase(updateMobilePhones.fulfilled, (state, action) => {
      const indexToUpdate = state.findIndex(
        (item) => item.cit === action.payload.cit
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
        `http://localhost:3000/coral/api/mobile-phones/${phone.cit}`,
        phone
      );
      if (respons.status !== 200) {
        console.log(
          respons.status,
          respons.data,
          `Telefonul ${phone.cit} nu a putut fi actualizat!!`
        );
        return;
      }

      console.log(
        respons.status,
        respons.data,
        `Telefonul ${phone.cit} a fost actualizat cu succes!!`
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
          `Telefonul ${phone.cit} nu a putut fi adaugat!!`
        );
        return;
      }

      console.log(
        response.status,
        response.data,
        `Telefonul ${phone.cit} a fost adaugat cu succes!!`
      );
      return phone;
    } catch (error) {
      throw new Error("Eroare la adaugarea telefonului", error);
    }
  }
);

// export const addEquipmentGroup = createAsyncThunk(
//   "mobilePhones/addEquipmentGroup",
//   async (equipmentList) => {
//     try {
//       await Promise.all(
//         equipmentList.map(async (eq) => {
//           const response = await axios.post(
//             `http://localhost:3000/coral/it/echipament`,
//             eq
//           );

//           if (response.status !== 200) {
//             console.log(
//               response.status,
//               response.data,
//               `Echipamentu nu a putut fi adaugat!!`
//             );
//             return;
//           }

//           console.log(
//             response.status,
//             response.data,
//             `Echipamentul ${eq.cit} a fost adaugat cu succes!!`
//           );
//         })
//       );
//       return equipmentList;
//     } catch (error) {
//       throw new Error("Eroare la adaugarea echipamentului", error);
//     }
//   }
// );

// export const updateEchipmentGroup = createAsyncThunk(
//   "mobilePhones/updateEquipmentGroup",
//   async (eqList) => {
//     try {
//       const updatedEchipamentList = await Promise.all(
//         eqList.map(async (eq) => {
//           delete eq._id;
//           const response = await axios.put(
//             `http://localhost:3000/coral/it/echipament/${eq.cit}`,
//             eq
//           );

//           return response.data.message;
//         })
//       );

//       console.log(updatedEchipamentList);
//       return updatedEchipamentList;
//     } catch (error) {
//       console.error("Eroare la actualizarea grupului de echipamente:", error);
//       throw error;
//     }
//   }
// );

export const deleteMobilePhone = createAsyncThunk(
  "mobilePhones/deleteMobilePhone",
  async (phoneCit) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/coral/api/mobile-phones/${phoneCit}`
      );
      if (response.status !== 200) {
        console.log(
          response.status,
          `Telefonul ${phoneCit} nu a putut fi sters!!`
        );
        return;
      }

      console.log(
        response.status,
        `Telefonul ${phoneCit} a fost sters cu succes!!`
      );
      return phoneCit;
    } catch (error) {
      throw new Error("Eroare la actualizarea telefonului ", phoneCit, error);
    }
  }
);

export default echipSlice.reducer;

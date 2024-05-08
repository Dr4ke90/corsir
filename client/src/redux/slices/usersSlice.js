import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    loggedUser: null,
  },
  reducers: {
    logOut: (state) => {
      state.loggedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        allUsers: action.payload,
      };
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
    });

    builder.addCase(adaugaUser.fulfilled, (state, action) => {
      state.allUsers = [...state.allUsers, action.payload];
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const indexToUpdate = state.allUsers.findIndex(
        (item) => item.username === action.payload.username
      );

      if (indexToUpdate !== -1) {
        const hash = "*".repeat(10);
        state.allUsers[indexToUpdate] = { ...action.payload, password: hash };
      }
    });
  },
});

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/coral/api/users");
      return response.data;
    } catch (error) {
      throw new Error("Eroare la upload-ul fiselor de inventar", error);
    }
  }
);

export const logIn = createAsyncThunk(
  "users/fetchOneUser",
  async function loginUser(credentials) {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      // Gestionează erorile aici
      console.error("Eroare la autentificare:", error);
      throw error; // Poți arunca eroarea sau să o gestionezi în alt mod
    }
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {

  try {
    const response = await axios.put(
      `http://localhost:3000/coral/api/users/${user.fisa}`,
      user
    );

    if (response.status !== 200) {
      console.log(
        response.status,
        response.data,
        `Utilizatorul ${user.nume} nu a putut fi actualizat!!`
      );
      return;
    }

    console.log(
      response.status,
      response.data,
      `Utilizatorul ${user.nume} a fost actualizat cu succes!!`
    );

    return user;
  } catch (error) {
    throw new Error("Eroare la actualizarea locatiei");
  }
});

export const adaugaUser = createAsyncThunk("users/adaugaUser", async (user) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/coral/api/users`,
      user
    );

    if (response.status !== 200) {
      console.log(
        response.status,
        response.data,
        `Utilizatorul ${user.nume} nu a putut fi adaugat!!`
      );
      return;
    }

    console.log(
      response.status,
      response.data,
      `Utilizatorul ${user.nume} a fost daugat cu succes!!`
    );

    return user;
  } catch (error) {
    throw new Error("Eroare la actualizarea locatiei");
  }
});

export const { logOut } = usersSlice.actions;
export default usersSlice.reducer;

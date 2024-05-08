export const IT_EQUIP_CREATE_MODAL_TABLE_COLUMNS = (handleOnChangeEditedItem) => [
    {
      accessorKey: "cit",
      header: "CIT",
      size: 40,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "tip",
      header: "Tip",
      size: 80,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: "model",
      header: "Model",
      size: 220,
      enableEditing: false,
      grow: true,
    },
    {
      accessorKey: "serie",
      header: "Serie",
      size: 130,
      grow: true,
      enableEditing: true,
      muiEditTextFieldProps: ({ cell, row }) => ({
        onBlur: (e) => handleOnChangeEditedItem(e, row),
      }),
    },
  ];
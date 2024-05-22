import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { updateMobilePhones } from "../../redux/slices/mobilePhonesSlice";
import { updateEchipament } from "../../redux/slices/echipSlice";
import { WORK_EQUIPMENT_TYPES } from "../../pages/WorkEquipment/Data/workEquipmentTypes";
import { updateWorkEquipment } from "../../redux/slices/workEquipmentSlice";
import { IT_EQUIPMENT_TYPES } from "../../pages/ItEquipment/Data/ItEquipmentTypes";

const Notice = ({ equipment }) => {
  const [noticeList, setNoticeList] = useState([]);
  const [noticeState, setNoticeState] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (equipment.observatii) {
      setNoticeList(equipment.observatii);
    } else {
      setNoticeList([]);
    }
  }, [equipment]);

  const handleChangeNotice = (e) => {
    const { value } = e.target;
    setNoticeState(value);
  };

  //   useEffect(async () => {
  //     const date = formatDate(new Date());
  //     let response;
  //     if (equipment.tip.toLowerCase() === "telefon") {
  //       response = await dispatch(
  //         updateMobilePhones({
  //           ...equipment,
  //           observatii: [...equipment.observatii, { [date]: noticeState }],
  //         })
  //       );
  //     } else {
  //       response = await dispatch(
  //         updateMobilePhones({
  //           ...equipment,
  //           observatii: [...equipment.observatii, { [date]: noticeState }],
  //         })
  //       );
  //     }
  //   }, [noticeList]);

  const handleAddNotice = async () => {
    const date = formatDate(new Date());
    let response;
    if (equipment.tip.toLowerCase() === "telefon") {
      response = await dispatch(
        updateMobilePhones({
          ...equipment,
          observatii: [...equipment.observatii, { [date]: noticeState }],
        })
      );
    } else if (WORK_EQUIPMENT_TYPES.includes(equipment.tip)) {
      response = await dispatch(
        updateWorkEquipment({
          ...equipment,
          observatii: [...equipment.observatii, { [date]: noticeState }],
        })
      );
    } else if (IT_EQUIPMENT_TYPES.includes(equipment.tip)) {
      response = await dispatch(
        updateEchipament({
          ...equipment,
          observatii: [...equipment.observatii, { [date]: noticeState }],
        })
      );
    } else {
      console.log("Tipul echipamentului nu este cunoscut");
      return;
    }

    if (response.meta.requestStatus === "fulfilled") {
      setNoticeList((prev) => {
        return [...prev, { [date]: noticeState }];
      });
    }

    setNoticeState("");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <TextField
          id="notice"
          onChange={handleChangeNotice}
          size="small"
          sx={{ width: "100%" }}
          value={noticeState}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleAddNotice}
          size="small"
        >
          Adauga
        </Button>
      </Box>
      <hr />
      <Box sx={{ marginTop: "10px" }}>
        {noticeList.map((obj, index) => {
          return (
            <Box key={index} sx={{ padding: "3px" }}>
              {Object.entries(obj).map(([key, value]) => {
                return <p key={key}> {`${key} - ${value}`}</p>;
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Notice;

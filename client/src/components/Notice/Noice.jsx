import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { updateMobilePhones } from "../../redux/slices/mobilePhonesSlice";
import { updateEchipament } from "../../redux/slices/echipSlice";

const Notice = ({ file }) => {
  const [noticeList, setNoticeList] = useState([]);
  const [noticeState, setNoticeState] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (file.observatii) {
      setNoticeList(file.observatii);
    } else {
      setNoticeList([]);
    }
  }, [file]);

  const handleChangeNotice = (e) => {
    const { value } = e.target;
    setNoticeState(value);
  };

  //   useEffect(async () => {
  //     const date = formatDate(new Date());
  //     let response;
  //     if (file.tip.toLowerCase() === "telefon") {
  //       response = await dispatch(
  //         updateMobilePhones({
  //           ...file,
  //           observatii: [...file.observatii, { [date]: noticeState }],
  //         })
  //       );
  //     } else {
  //       response = await dispatch(
  //         updateMobilePhones({
  //           ...file,
  //           observatii: [...file.observatii, { [date]: noticeState }],
  //         })
  //       );
  //     }
  //   }, [noticeList]);

  const handleAddNotice = async () => {
    const date = formatDate(new Date());
    let response;
    if (file.tip.toLowerCase() === "telefon") {
      response = await dispatch(
        updateMobilePhones({
          ...file,
          observatii: [...file.observatii, { [date]: noticeState }],
        })
      );
    } else {
      response = await dispatch(
        updateMobilePhones({
          ...file,
          observatii: [...file.observatii, { [date]: noticeState }],
        })
      );
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

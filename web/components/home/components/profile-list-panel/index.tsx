import { Box, Typography } from "@mui/material";
import ProfileListBody from "./body";
import ProfileListHeader from "./header";
import { useStyles } from "./style";

export default function ProfileListPanel() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <ProfileListHeader />
      <Typography className={classes.bodyHeader} variant="body2">
        ລາຍຊື່ຜູ້ໃຊ້ງານ
      </Typography>
      <ProfileListBody />
    </Box>
  );
}

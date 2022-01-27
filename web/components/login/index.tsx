import AccountCircle from "@mui/icons-material/AccountCircle";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useStyles } from "./style";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginComponent = () => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    facebook: false,
    google: false,
    twitter: false,
  });

  return (
    <Paper elevation={0} className={classes.root}>
      <Container maxWidth="xs">
        <Box className={classes.headerBox}>
          <AccountCircle fontSize="large" color="primary" />
          <Typography className={classes.headerTypography}>
            ເຂົ້າສູ່ລະບົບ
          </Typography>
        </Box>
        <Box className={classes.socialBox}>
          <Stack justifyContent="center" spacing={2}>
            <LoadingButton
              loading={loading.facebook}
              loadingPosition="center"
              startIcon={<FacebookRoundedIcon />}
              variant="outlined"
              disabled={Object.keys(loading).some((key: string) => {
                return loading[key];
              })}
              onClick={() => {
                setLoading({ ...loading, facebook: true });
                router.push(
                  process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_URL as string
                );
              }}
            >
              Facebook
            </LoadingButton>
            <LoadingButton
              disabled
              loadingPosition="center"
              startIcon={<GoogleIcon />}
              variant="outlined"
            >
              Google
            </LoadingButton>
            <LoadingButton
              disabled
              loadingPosition="center"
              startIcon={<TwitterIcon />}
              variant="outlined"
            >
              Twitter
            </LoadingButton>
          </Stack>
        </Box>

        <Divider>
          <Typography className={classes.dividerText}>ຫຼື</Typography>
        </Divider>

        <Box className={classes.footerBox}>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.loginButton}
            disabled
          >
            Log in
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default LoginComponent;

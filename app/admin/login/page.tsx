"use client";
import BoxedLayout from "@/components/box/BoxedLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserRepository } from "@/repository/UserRepository";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/common/firebase";
import { useAuth } from "@/common/contexts/AuthProvider";

interface IFormInput {
  email: string;
  password: string;
}

enum ETypeLoading {
  READY,
  LOADING,
  LOADED,
}

interface IState {
  loading?: ETypeLoading;
}

enum ETypeState {
  READY,
  LOADING,
  LOADED,
}
// https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
const reducer = (state: IState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ETypeState.LOADED:
      state.loading = ETypeLoading.LOADED;
      return { ...state };
    case ETypeState.LOADING:
      state.loading = ETypeLoading.LOADING;
      return { ...state };
    case ETypeState.READY:
      state.loading = ETypeLoading.READY;
      return { ...state };
    default:
      return { ...state };
  }
};

const LoginAdminPage = () => {
  const { login, authKey, setAuthKey } = useAuth();
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("Email không được bỏ trống")
        .email("Không đúng định dạng email"),
      password: yup.string().required("Mật khẩu không được bỏ trống"),
    })
    .required();

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [state, dispatch] = useReducer(reducer, {
    loading: ETypeLoading.READY,
  });
  const userRepository = new UserRepository();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch({ type: ETypeState.LOADING, payload: ETypeLoading.LOADING });
    const response = await login(data.email, data.password);
    dispatch({ type: ETypeState.LOADED, payload: ETypeLoading.LOADED });

    if (!response || response === "") {
      toast.error("Thông tin đăng nhập không đúng");
    } else {
      setAuthKey(response);
      router.replace("/admin");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !!authKey) {
        router.replace("/admin");
      }
    });
  }, []);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(../../img/startup.svg)",
            backgroundRepeat: "no-repeat",
            bgcolor: "rgb(236, 239, 241)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          <BoxedLayout>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"email"}
                  render={({ field, formState }) => (
                    <>
                      <TextField
                        fullWidth
                        error={!!formState.errors["email"]}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        helperText={`${
                          formState.errors["email"]?.message ?? ""
                        }`}
                        label="Email (*)"
                        InputProps={{
                          style: {
                            borderRadius: 16,
                          },
                        }}
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <Box sx={{ my: 2 }}>
                <Controller
                  control={control}
                  name={"password"}
                  render={({ field, formState }) => (
                    <>
                      <TextField
                        fullWidth
                        error={!!formState.errors["password"]}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        helperText={`${
                          formState.errors["password"]?.message ?? ""
                        }`}
                        label="Mật khẩu (*)"
                        InputProps={{
                          style: {
                            borderRadius: 16,
                          },
                        }}
                        type="password"
                      ></TextField>
                    </>
                  )}
                ></Controller>
              </Box>
              <LoadingButton
                type="submit"
                fullWidth
                loading={state.loading === ETypeLoading.LOADING}
                variant="contained"
                sx={{ mt: 3 }}
                size="large"
              >
                Đăng nhập
              </LoadingButton>
            </form>
          </BoxedLayout>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginAdminPage;
LoginAdminPage.getLayout = (page: any) => page;

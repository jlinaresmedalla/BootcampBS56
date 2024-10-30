import { authRequest } from "@/api/dummyjsonApi";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginValidationSchema } from "../Loginpage.schema";
import { clearSpaces } from "@/utils/app.utils";

export const useLoginPageController = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({ mutationFn: authRequest });

  const { values, handleSubmit, errors, handleChange, touched } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: ({ username, password }, { resetForm }) => {
      const body = { username: clearSpaces(username), password: clearSpaces(password) };

      mutate(body, {
        onSuccess: () => {
          toast.success("Inicio de sesión exitoso");
          navigate("/market");
        },
        onError: () => {
          toast.error("Credenciales inválidas");
          resetForm();
        },
      });
    },
  });

  return {
    values,
    handleSubmit,
    errors,
    handleChange,
    touched,
    isLoginRequestLoading: isPending,
  };
};
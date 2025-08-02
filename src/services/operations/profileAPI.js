import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_USER_API,
  CHANGE_PASSWORD_API,
  UPDATE_PROFILE_API,
} = settingsEndpoints;

export const updateProfilePicture = (formData) => {
  return async (dispatch, getState) => {
    let toastId;
    const token = getState().auth.token;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // image bhej rahe ho
      };

      dispatch(setLoading(true));
      toastId = toast.loading("Loading");
      const response = await apiConnector(
        "PATCH",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        headers
      );

      console.log(response);

      if (!response.data.success) {
        toast.error("Unable to update picture");
        toast.dismiss(toastId);
        return;
      }
      dispatch(setLoading(false));
      dispatch(setUser(response.data.user));
      toast.dismiss(toastId);
      toast.success("Picture updated successfully");
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
    }
  };
};

/* MAINLY UPDATE - FIRST NAME and LAST NAME */
export const updateUser = (data) => {
  return async (dispatch, getState) => {
    let toastId;
    const token = getState().auth.token;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      dispatch(setLoading(true));
      toast.loading("Loading");
      const response = await apiConnector(
        "PATCH",
        UPDATE_USER_API,
        data,
        headers
      );
      if (!response.data.success) {
        toast.error("Unable to update picture");
        return;
      }
      setLoading(false);
      dispatch(setUser(response.data.user));
      toast.success("Profile Updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

/* MAINLY UPDATE - PASSWORD */
export const updatePassword = (data) => {
  console.log("data in password", data);
  return async (dispatch, getState) => {
    let toastId;
    const token = getState().auth.token;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      dispatch(setLoading(true));
      toastId = toast.loading("Loading");
      const response = await apiConnector(
        "PATCH",
        CHANGE_PASSWORD_API,
        data,
        headers
      );
      if (!response.data.success) {
        toast.error("Unable to update passwords");
        toast.dismiss(toastId);
        dispatch(setLoading(false));
        return;
      }
      dispatch(setUser(response.data.user));
      toast.success("Password Updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

/* MAINLY UPDATE PROFILE - MOBILE NO, DATE OF BIRTH, GENDER, ABOUT */
export const updateProfile = (data) => {
  return async (dispatch, getState) => {
    let toastId;
    const token = getState().auth.token;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      dispatch(setLoading(true));
      toastId = toast.loading("Loading");
      const response = await apiConnector(
        "PATCH",
        UPDATE_PROFILE_API,
        data,
        headers
      );
      if (!response.data.success) {
        toast.error("Unable to update profile");
        toast.dismiss(toastId);
        dispatch(setLoading(false));
        return;
      }
      setLoading(false);
      dispatch(setUser(response.data.user));
      toast.success("Profile Updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

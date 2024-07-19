
// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage2 } from "./../firebase"; // Adjust the path based on your actual setup
// import axios from "axios";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   MenuItem,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import { districts, occupations } from "../data/data";


// const EditProfile: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     district: "",
//     ProfileUrl: "",
//     occupation: "",
//     address: "",
//   });
//   const [formData, setFormData] = useState({
//     profileImage: null as File | null,
//   });

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (userId) {
//       fetchStudentProfile(userId);
//     }
//   }, [userId]);

//   const fetchStudentProfile = async (userId: string) => {
//     try {
//       const response = await axios.get(
//        `http://localhost:5025/api/Tutor/details/${userId}`
//       );
//       setProfileData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching student profile:", error);
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setProfileData({
//       ...profileData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData({
//         profileImage: e.target.files[0],
//       });
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Upload image to Firebase Storage if a new image is selected
//       if (formData.profileImage) {
//         const storageRef = ref(
//           storage2,
//           `profile_images/${userId}_${formData.profileImage.name}`
//         );
//         await uploadBytes(storageRef, formData.profileImage);
//         const imageUrl = await getDownloadURL(storageRef);
//         profileData.ProfileUrl = imageUrl;
//       }

//       // Update profile data
//       await axios.put(
//         `http://localhost:5025/api/Tutor/ProfileUpdate/${userId}`,
//         profileData
//       );

//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         maxWidth: 450,
//         mx: "auto",
//         p: 2,
//         boxShadow: 1,
//         borderRadius: 4,
//         bgcolor: "background.paper",
//         mt: 12,
//       }}
//     >
//       <Typography
//         variant="h5"
//         component="h5"
//         sx={{ textAlign: "center", color: "darkblue" }}
//       >
//         Edit Profile
//       </Typography>
//       <TextField
//         size="small"
//         label="First Name"
//         name="firstName"
//         value={profileData.firstName}
//         onChange={handleInputChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         size="small"
//         label="Last Name"
//         name="lastName"
//         value={profileData.lastName}
//         onChange={handleInputChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//        <TextField
//         select
//         size="small"
//         label="Occupation"
//         name="occupation"
//         value={profileData.occupation}
//         onChange={handleInputChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       >
//         {occupations.map((occupation) => (
//           <MenuItem key={occupation} value={occupation}>
//             {occupation}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         size="small"
//         label="Address"
//         name="address"
//         rows={3}
//         multiline
//         value={profileData.address}
//         onChange={handleInputChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         select
//         size="small"
//         label="District"
//         name="district"
//         value={profileData.district}
//         onChange={handleInputChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       >
//         {districts.map((district) => (
//           <MenuItem key={district} value={district}>
//             {district}
//           </MenuItem>
//         ))}
//       </TextField>
      
//       <TextField
//         size="small"
//         label="Phone Number"
//         name="phoneNumber"
//         value={profileData.phoneNumber}
//         onChange={handleInputChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         size="small"
//         label="Profile Image"
//         type="file"
//         onChange={handleImageChange}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true }}
//       />
     
//       <Box mt={2} display="flex" justifyContent="flex-end">
//         <Button
//           size="small"
//           type="submit"
//           variant="contained"
//           sx={{ borderRadius: "10px" }}
//           color="primary"
//           disabled={loading}
//           startIcon={loading ? <CircularProgress size="1rem" /> : null}
//         >
//           {loading ? "Updating..." : "Update Profile"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EditProfile;


import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage2 } from "./../firebase"; // Adjust the path based on your actual setup
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { districts, occupations } from "../data/data";

const phoneNumberRegex = /^07\d{8}$/;

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    district: "",
    ProfileUrl: "",
    occupation: "",
    address: "",
  });
  const [formData, setFormData] = useState({
    profileImage: null as File | null,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    district: "",
    occupation: "",
    address: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchStudentProfile(userId);
    }
  }, [userId]);

  const fetchStudentProfile = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5025/api/Tutor/details/${userId}`
      );
      setProfileData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        profileImage: e.target.files[0],
      });
    }
  };

  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors.firstName = profileData.firstName ? "" : "First Name is required";
    tempErrors.lastName = profileData.lastName ? "" : "Last Name is required";
    tempErrors.phoneNumber = phoneNumberRegex.test(profileData.phoneNumber)
      ? ""
      : "Phone number is not valid";
    tempErrors.district = profileData.district ? "" : "District is required";
    tempErrors.occupation = profileData.occupation ? "" : "Occupation is required";
    tempErrors.address = profileData.address ? "" : "Address is required";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Upload image to Firebase Storage if a new image is selected
      if (formData.profileImage) {
        const storageRef = ref(
          storage2,
          `profile_images/${userId}_${formData.profileImage.name}`
        );
        await uploadBytes(storageRef, formData.profileImage);
        const imageUrl = await getDownloadURL(storageRef);
        profileData.ProfileUrl = imageUrl;
      }

      // Update profile data
      await axios.put(
        `http://localhost:5025/api/Tutor/ProfileUpdate/${userId}`,
        profileData
      );

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 450,
        mx: "auto",
        p: 2,
        boxShadow: 1,
        borderRadius: 4,
        bgcolor: "background.paper",
        mt: 12,
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: "center", color: "darkblue" }}
      >
        Edit Profile
      </Typography>
      <TextField
        size="small"
        label="First Name"
        name="firstName"
        value={profileData.firstName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        size="small"
        label="Last Name"
        name="lastName"
        value={profileData.lastName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        select
        size="small"
        label="Occupation"
        name="occupation"
        value={profileData.occupation}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.occupation}
        helperText={errors.occupation}
      >
        {occupations.map((occupation) => (
          <MenuItem key={occupation} value={occupation}>
            {occupation}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size="small"
        label="Address"
        name="address"
        rows={3}
        multiline
        value={profileData.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        select
        size="small"
        label="District"
        name="district"
        value={profileData.district}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.district}
        helperText={errors.district}
      >
        {districts.map((district) => (
          <MenuItem key={district} value={district}>
            {district}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size="small"
        label="Phone Number"
        name="phoneNumber"
        value={profileData.phoneNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
      />
      <TextField
        size="small"
        label="Profile Image"
        type="file"
        onChange={handleImageChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          size="small"
          type="submit"
          variant="contained"
          sx={{ borderRadius: "10px" }}
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size="1rem" /> : null}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;

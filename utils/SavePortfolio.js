// import { toast } from 'react-toastify';
// import { api } from './downloadPortfolio';

// export const savePortfolio = async (userData) => {
//   const toastId = toast.loading('Submitting portfolio...');
  
//   try {
//     const { data } = await api.post('/portfolio', userData);

//     if (!data) {
//       throw new Error('No data received');
//     }

//     toast.update(toastId, {
//       render: 'Portfolio submitted successfully!',
//       type: 'success',
//       isLoading: false,
//       autoClose: 3000,
//     });

//     return data;
    
//   } catch (error) {
//     const errorMessage = error.response?.data?.error || error.message || 'Something went wrong';
//     toast.update(toastId, {
//       render: errorMessage,
//       type: 'error',
//       isLoading: false,
//       autoClose: 5000,
//     });
    
//     throw error;
//   }
// };

import { toast } from 'react-toastify';
import { api } from './downloadPortfolio';
import { uploadImageToCloudinary } from './cloudinary';


export const savePortfolio = async (userData) => {
  const toastId = toast.loading('Submitting portfolio...');
  
  try {
    // Upload homepage photo
    const homePagePhotoUrl = userData.homePagePhoto ? 
      await uploadImageToCloudinary(userData.homePagePhoto) : null;
    
    const aboutImage = userData.aboutImgUrl ? 
      await uploadImageToCloudinary(userData.aboutImgUrl) : null;

    // Upload project images
    const projectsWithUrls = await Promise.all(userData.projects.map(async project => {
      if (project.image) {
        const imageUrl = await uploadImageToCloudinary(project.image);
        return {
          ...project,
          image: imageUrl.url // Store only the URL
        };
      }
      return project;
    }));

    // Prepare the payload with image URLs instead of base64 data
    const portfolioPayload = {
      ...userData,
      homePagePhoto: homePagePhotoUrl?.url || null,
      aboutImgUrl: aboutImage?.url || null,
      projects: projectsWithUrls
    };

    // Send data to your backend
    const { data } = await api.post('/portfolio', portfolioPayload);

    toast.update(toastId, {
      render: 'Portfolio submitted successfully!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });

    return data;
  } catch (error) {
    toast.update(toastId, {
      render: error.message || 'Error submitting portfolio',
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    });
    throw error;
  }
};
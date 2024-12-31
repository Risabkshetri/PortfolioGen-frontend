export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Portfolio-builder-media'); // Create this in Cloudinary dashboard
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return {
      url: data.secure_url,  // This is your public URL
      publicId: data.public_id // Store this if you need to manage the image later
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
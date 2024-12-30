import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
 cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
 api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
 api_secret:process.env.CLOUDINARY_API_SECRET,
});

// export the configured instance
export default cloudinary;
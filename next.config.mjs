/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "res.cloudinary.com"
        ]
    },
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
};

export default nextConfig;

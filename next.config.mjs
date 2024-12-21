const nextConfig  = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'nextjstube.s3.ap-south-1.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
  }

  export default nextConfig
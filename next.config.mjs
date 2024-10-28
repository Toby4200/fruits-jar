/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/fruits',
        destination:
          'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws',
      },
    ];
  },
};

export default nextConfig;

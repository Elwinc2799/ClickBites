/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    env: {
        API_URL: 'http://127.0.0.1:5000',
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
            'AIzaSyBnraoZ2LAkFzikVrdUFKkvS8pBeUk3pVg',
    },
};

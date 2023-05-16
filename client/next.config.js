/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*'
      },
      {
        source: '/api/users',
        destination: 'http://localhost:3000/api/users'
      },
      {
        source: '/api/employees',
        destination: 'http://localhost:3000/api/employees'
      },
      {
        source: '/api/auth/signin',
        destination: 'http://localhost:3000/api/auth/signin'
      },
      {
        source: '/api/auth/validate',
        destination: 'http://localhost:3000/api/auth/validate'
      },
      // {
      //   source: '/api/auth/_log',
      //   destination: 'http://localhost:3000/api/auth/_log'
      // },
      {
        source: '/api/auth/session',
        destination: 'http://localhost:3000/api/auth/session'
      },
      {
        source: '/api/auth/logout',
        destination: 'http://localhost:3000/api/auth/logout'
      },
    ]
  }
}

// const nextConfig = {
//   callbacks: {
//     async signIn(user, account, profile) {
//       return true;
//     },
//     async signOut() {
//       return true;
//     },
//   },
// }

module.exports = nextConfig

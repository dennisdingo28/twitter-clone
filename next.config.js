/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"lh3.googleusercontent.com",
                port:"",
                pathname:"/*/*"
            },
            {
                protocol:"https",
                hostname:"avatars.githubusercontent.com",
                port:"",
                pathname:"/*/*"
            },
        ]
    },
    webpack: (config, { isServer }) => {
        // Add a new rule to handle image files using file-loader
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                publicPath: '/_next/static/images', // Adjust the publicPath as per your project structure
                outputPath: 'static/images', // Adjust the outputPath as per your project structure
              },
            },
          ],
        });
    
        // Return the updated Webpack configuration
        return config;
      },
}

module.exports = nextConfig

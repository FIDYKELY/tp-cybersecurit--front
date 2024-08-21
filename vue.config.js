// vue.config.js
module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: 'http://localhost:8000', // Adjust this to match your backend's address
 },
};

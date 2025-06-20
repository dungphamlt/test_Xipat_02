/** @type {import('postcss').ProcessOptions} */
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // Sử dụng plugin @tailwindcss/postcss
    autoprefixer: {}, // Thêm autoprefixer để hỗ trợ trình duyệt
  },
};

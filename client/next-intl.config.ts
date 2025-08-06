/** @type {import('next-intl').NextIntlConfig} */
const nextIntlConfig = {
    locales: ['vi', 'en'], // danh sách các locale bạn hỗ trợ
    defaultLocale: 'vi', // locale mặc định
    localePath: './src/app/messages' // thư mục chứa file JSON dịch thuật
};

export default nextIntlConfig;

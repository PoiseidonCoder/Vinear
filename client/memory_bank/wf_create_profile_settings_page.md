# Workflow: Create Profile Settings Page

## Current tasks from user prompt:

- Tạo trang setting profile để người dùng có thể cập nhật thông tin cá nhân
- Form để edit username, avatar, và các thông tin khác
- Upload avatar functionality
- API integration để update profile

## Plan (simple):

Tạo trang settings profile với form để người dùng có thể cập nhật thông tin cá nhân, bao gồm upload avatar

## Steps:

1. Tạo route /settings/profile trong app directory
2. Tạo component ProfileSettings với form để edit thông tin
3. Tạo API function để update profile
4. Thêm upload avatar functionality
5. Cập nhật navigation để link đến settings page
6. Thêm translations cho settings page

## Things done:

- Phân tích yêu cầu và tạo workflow
- Tạo route /settings và /settings/profile trong app directory
- Tạo ProfileSettings component với form để edit thông tin
- Tạo API hooks: useUpdateProfile và useUploadAvatar
- Tích hợp ImageCropper component với canvas để crop ảnh
- Thêm modal crop ảnh với preview và controls (zoom, rotation, crop size)
- Cập nhật navigation để link đến settings page từ UserMenu
- Thêm translations cho settings page (en & vi)
- Cài đặt @radix-ui/react-slider dependency
- Fix linter errors

## Things aren't done yet:

- Tất cả đã hoàn thành - trang settings profile với tính năng crop ảnh đã sẵn sàng
- Upload image ngay sau khi crop xong - ✅ hoàn thành
- Hiển thị loading state khi upload - ✅ hoàn thành
- Toast notifications cho success/error - ✅ hoàn thành

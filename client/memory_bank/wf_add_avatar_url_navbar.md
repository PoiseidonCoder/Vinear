# Workflow: Add Avatar URL to Navbar

## Current tasks from user prompt:

- Hiển thị avatarUrl trong navbar thay vì chỉ hiển thị chữ cái đầu của username
- Cập nhật UserDto type để include avatarUrl
- Cập nhật UserMenu component để sử dụng avatarUrl

## Plan (simple):

Cập nhật type definitions và components để hỗ trợ hiển thị avatar image từ API response

## Steps:

1. Cập nhật UserDto type trong auth.ts để thêm avatarUrl field
2. Cập nhật UserMenu component để hiển thị avatar image thay vì chữ cái
3. Test và kiểm tra hiển thị

## Things done:

- Đọc và phân tích cấu trúc hiện tại của navbar và user menu
- Xác định được response API trả về avatarUrl
- Cập nhật UserDto type để thêm avatarUrl field (optional)
- Cập nhật UserMenu component để hiển thị avatar image với fallback là chữ cái đầu
- Kiểm tra linter errors và đã fix

## Things aren't done yet:

- Tất cả đã hoàn thành

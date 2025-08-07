# Workflow: Merge User Services

## Current tasks from user prompt
- Gộp MyUserDetailsService với UserService để tối ưu hóa cấu trúc service
- Sửa lỗi circular dependency giữa SecurityConfig và UserService

## Plan (simple)
- Sửa lỗi circular dependency bằng cách tách AuthenticationManager khỏi UserService
- Sử dụng @Lazy annotation hoặc tái cấu trúc dependency injection

## Steps
1. ✅ Đọc và phân tích cả hai service hiện tại
2. ✅ Gộp chức năng của MyUserDetailsService vào UserService
3. ✅ Cập nhật SecurityConfig để sử dụng UserService
4. ✅ Xóa file MyUserDetailsService.java
5. 🔄 Sửa lỗi circular dependency
6. Test kết quả

## Things done
- Tạo workflow file
- Đọc và phân tích MyUserDetailsService.java và UserService.java
- Gộp chức năng UserDetailsService vào UserService
- Cập nhật SecurityConfig để sử dụng UserService
- Xóa file MyUserDetailsService.java
- Phát hiện lỗi circular dependency

## Things aren't done yet
- Sửa lỗi circular dependency
- Test kết quả để đảm bảo ứng dụng hoạt động bình thường

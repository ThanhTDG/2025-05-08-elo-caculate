# Research

## Strict Mode

Strict mode là một tính năng trong JavaScript. Khi bật lên, JavaScript sẽ thực thi mã nguồn bắt buộc phải tuân thủ những quy tắc, quy định.

### Những kiểu strict mode có thể áp dụng

- Áp dụng cho cả file script.
- Áp dụng trong một function.
- Áp dụng trong một module.
- Áp dụng trong một class.

### Ưu điểm

- Giảm rủi ro khi phát triển.
- Giúp viết code sạch hơn.
- Tăng cường tính bảo mật.

### Nhược điểm

- Có thể gây lỗi với mã nguồn cũ không tuân thủ strict mode.

---

# Elo Rating System

## Available Scripts

### `npm install`

Cài đặt các dependencies cần thiết.

### `npm start`

Khởi chạy ứng dụng.

---

## Giới thiệu

Hệ thống tính điểm Elo được sử dụng để xếp hạng người chơi dựa trên hiệu suất của họ trong các trận đấu.

---

## Cấu trúc dự án

Dự án được tổ chức theo cấu trúc thư mục như sau:

```
src/
├── assets/         # Tài nguyên hình ảnh
├── config/         # Cấu hình hệ thống
├── controllers/    # Xử lý logic chính của ứng dụng
├── db/             # Cơ sở dữ liệu giả lập
├── fake_Data/      # Dữ liệu giả lập
├── hook/           # Custom hooks cho React
├── models/         # Các mô hình dữ liệu (Player, Match, Team, Stats)
├── repositories/   # Tương tác với API hoặc cơ sở dữ liệu
├── services/       # Xử lý logic nghiệp vụ (Elo, Match, Player)
├── utils/          # Các tiện ích chung
├── views/          # Giao diện người dùng (React Components)
└── index.js        # Điểm khởi đầu của ứng dụng
```

---

## Công nghệ sử dụng

### **Frontend**:

- **React.js**: Xây dựng giao diện người dùng.
- **React Router**: Quản lý điều hướng giữa các trang.
- **CSS**: Tùy chỉnh giao diện.

### **Backend**:

- **JSON Server**: API giả lập để lưu trữ và truy xuất dữ liệu.
- **Node.js**: Xử lý logic phía server (nếu cần mở rộng).

### **Thư viện khác**:

- **uuid**: Tạo ID duy nhất cho các đối tượng.
- **PropTypes**: Kiểm tra kiểu dữ liệu trong React Components.

---

## Các chức năng chính

### **Quản lý người chơi**:

- Hiển thị danh sách người chơi và thông tin chi tiết.
- Tính toán các chỉ số như KDA, tỷ lệ thắng, và điểm Elo.

### **Quản lý trận đấu**:

- Tạo trận đấu ngẫu nhiên với các đội và người chơi.
- Hiển thị chi tiết trận đấu, bao gồm đội thắng, MVP, và các chỉ số.

### **Tính toán Elo**:

- Cập nhật điểm Elo của người chơi sau mỗi trận đấu.
- Hiển thị bảng xếp hạng Elo.

### **Bảng xếp hạng**:

- Hiển thị danh sách người chơi theo thứ tự Elo.
- Phân trang và tìm kiếm người chơi.

---

## Thuật toán tạo trận đấu

### **Mô tả**:

1. **Chọn người chơi**:

   - Lấy danh sách người chơi từ cơ sở dữ liệu.
   - Chọn ngẫu nhiên các người chơi có Elo gần nhau để tạo sự cân bằng.

2. **Chia đội**:

   - Chia người chơi thành các đội dựa trên số lượng người chơi mỗi đội và số đội trong trận.

3. **Gán chỉ số ngẫu nhiên**:

   - Gán các chỉ số như kills, deaths, assists, damage, gold... cho từng người chơi.

4. **Xác định đội thắng**:

   - Sắp xếp các đội theo điểm số và chọn đội có điểm cao nhất làm đội thắng.

5. **Cập nhật thông tin trận**:
   - Ghi nhận đội thắng, MVP, và các chỉ số khác.

---

## Thuật toán Elo

### **Công thức tính Elo**:

```js
ΔElo = K * (Score - ExpectedScore);
```

Hoặc:

```js
const delta =
	K *
	winFactor *
	performanceRatio *
	difficultyFactor *
	mvpFactor *
	adjustmentFactor;
```

- Được tính trên toàn bộ 100 trận gần nhất của người chơi
- **K**: Hằng số điều chỉnh độ nhạy (thường là 32).
- **Score**: Kết quả trận đấu (1 cho thắng, 0 cho thua).
- **ExpectedScore**: Tỷ lệ chiến thắng lý thuyết dựa trên sự khác biệt Elo.

### **Các yếu tố ảnh hưởng**:
- **Các trận đấu trước(~100)**:
- **Win Factor**: Giá trị 1 cho đội thắng, -1 cho đội thua.
- **Performance Ratio**: Hiệu suất của người chơi so với trung bình.
- **Difficulty Factor**: Độ khó của trận đấu dựa trên Elo trung bình của lobby.
- **MVP Factor**: Người chơi MVP được cộng thêm điểm.
- **Adjustment Factor**: Điều chỉnh nếu Elo của người chơi cao hơn hoặc thấp hơn so với trung bình.

###  
- Thuật toán chưa tối ưu tính toán chưa tối ưu việc tính lại toàn bộ dựa trên 100 trận gần nhất

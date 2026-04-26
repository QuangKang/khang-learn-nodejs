# Node.js
**Repository:** `khang-learn-nodejs`

Dự án này là tổng hợp các kịch bản thực hành nền tảng về Node.js (Core APIs) và một RESTful API hoàn chỉnh sử dụng Express.js. Toàn bộ mã nguồn được thiết kế để loại bỏ hoàn toàn Callback Hell, áp dụng triệt để chuẩn bất đồng bộ `async/await` và hệ thống Module ESM hiện đại.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Guide](#setup-guide)
3. [Phần 1: Practice core APIs](#phần-1-practice-core-apis)
4. [Phần 2: Grocery List REST API](#phần-2-grocery-list-rest-api)
5. [Testing Guide](#testing-guide)
6. [Additional Knowledge](#additional-knowledge)

---

## Prerequisites
- **Node.js**: Phiên bản `v22.x LTS` trở lên.
- **NPM**: Trình quản lý gói đi kèm với Node.js.
- **Terminal**: Command Prompt (CMD), PowerShell, hoặc Git Bash.

---

## Setup Guide

1. Clone repository này về máy tính:
   ```bash
   git clone <url-github>
   cd khang-learn-nodejs
   ```

2. Cài đặt các thư viện phụ thuộc (dependencies):
   ```bash
   npm install
   ```

## Phần 1: Practice core APIs

### Bài 1: File I/O với fs/promises (`1-file-io.js`)
- **Mục đích:** Chứng minh cơ chế Non-blocking I/O của Node.js thông qua việc đọc/ghi tệp tin bất đồng bộ. Bằng cách sử dụng module fs/promises và async/await, tác vụ I/O nặng được đẩy xuống hệ điều hành xử lý dưới nền, đảm bảo Main Thread không bị "đóng băng" và có thể tiếp tục thực thi các luồng code khác.
- **Lệnh chạy:**
  ```bash
  node 1-file-io.js
  ```

### Bài 2: HTTP client với fetch (`2-http-client.js`)
- **Mục đích:** Xây dựng một HTTP Client sử dụng hàm fetch để gửi GET request tới API nội bộ (localhost:3000). Quá trình này mô phỏng vòng đời kết nối mạng thực tế: từ việc gửi yêu cầu, kiểm tra HTTP Status (response.ok), đến việc bóc tách dữ liệu JSON và hiển thị trực quan ra Terminal bằng console.table.
- **Lệnh chạy:**
  ```bash
  node 2-http-client.js
  ```

### Bài 3: Giải phẫu Event Loop (`3-event-loop.js`)
- **Mục đích:** Trình bày trực quan thứ tự ưu tiên tuyệt đối của các hàng đợi (Queues) bên trong Event Loop. Kịch bản này kiểm chứng thực tế rằng Node.js luôn thực thi Code đồng bộ (Synchronous) đầu tiên, sau đó xử lý Microtask Queue (ưu tiên process.nextTick trước Promise), và cuối cùng mới gọi đến Macrotask Queue (như setTimeout).
- **Lệnh chạy:**
  ```bash
  node 3-event-loop.js
  ```

### Bài 4: Stream processing (`4-stream.js`)
- **Mục đích:** Giải quyết bài toán tối ưu hóa bộ nhớ (RAM) khi xử lý các file dữ liệu khổng lồ bằng kỹ thuật Stream. Thay vì load toàn bộ file vào bộ nhớ cùng lúc gây rủi ro tràn RAM, kịch bản dùng fs.createReadStream để chia nhỏ file thành các mảnh (chunks) và xử lý cuốn chiếu một cách an toàn.
- **Lệnh chạy:**
  ```bash
  node 4-stream.js
  ```

### Bài 5: Công cụ dòng lệnh CLI Máy tính (`5-cli-tool.js`)
- **Mục đích:** Xây dựng công cụ máy tính (calculator) tương tác trực tiếp trên Terminal bằng cách khai thác biến toàn cục process.argv.slice(2). Kịch bản không chỉ thực hiện tính toán qua switch/case mà còn bao gồm logic kiểm tra tính hợp lệ của dữ liệu đầu vào (ép kiểu parseFloat, bắt lỗi thiếu tham số, lỗi NaN, và xử lý triệt để lỗi chia cho 0).
- **Lệnh chạy ví dụ:**
  ```bash
  node 5-cli-tool.js 15 + 5
  node 5-cli-tool.js 10 x 2
  node 5-cli-tool.js 10 / 0
  ```

---

## Phần 2: Grocery List REST API

Một API Server quản lý danh sách đi chợ, lưu trữ dữ liệu tạm thời (In-memory JSON array).

### Khởi động Server
Bắt buộc khởi động Server trước khi tiến hành test API:
```bash
node express-api.js
```
*Server sẽ bắt đầu lắng nghe (Listen) tại: `http://localhost:3000`*

### API Endpoints Reference

| HTTP Method | Endpoint | Mô tả | Body (JSON Format) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/groceries` | Lấy toàn bộ danh sách | Không |
| **GET** | `/api/groceries/:id` | Lấy chi tiết một món theo ID | Không |
| **POST** | `/api/groceries` | Thêm món đồ mới | `{ "name": "Tên món", "quantity": 1 }` |
| **DELETE**| `/api/groceries/:id` | Xóa một món theo ID | Không |

---

## Testing Guide

*(Dùng curl.exe hoặc dùng curl bằng **Command Prompt (CMD)** trên Windows để chạy các lệnh cURL dưới đây).*

Mở một cửa sổ Terminal mới và chạy các lệnh:

**1. Xem toàn bộ danh sách (GET):**
```bash
curl http://localhost:3000/api/groceries
```

**2. Xem chi tiết món đồ số 3 (GET Detail):**
```bash
curl http://localhost:3000/api/groceries/3
```

**3. Thêm một món mới vào danh sách (POST):**
```bash
curl -X POST http://localhost:3000/api/groceries -H "Content-Type: application/json" -d "{\"name\": \"Chicken\", \"quantity\": 2}"
```

**4. Xóa món đồ số 2 (DELETE):**
```bash
curl -X DELETE http://localhost:3000/api/groceries/2
```

---

## Additional Knowledge

### npm install vs npm ci

**npm install:** Lệnh sử dụng thường xuyên khi develope local.
- Lệnh này đọc file `package.json` để biết cần tải thư viện gì.
- Có thể cập nhật phiên bản mới nhất nếu được cho phép bởi file `package.json`.
- Khi cập nhật phiên bản mới, file `package-lock.json` sẽ được override để lưu lại cập nhật.
- Check `node_modules` hiện tại và tải thêm nếu thư mục bị thiếu hoặc cập nhật nếu bị outdated.
- Sử dụng khi cần thêm thư viện mới, cập nhật thư viện cũ hoặc khi mới bắt đầu project.

**npm ci:** Lệnh được dành riêng cho môi trường tự động hóa (CI/CD Pipelines) như GitHub Actions, GitLab CI, Jenkins... hoặc khi muốn một môi trường hoàn toàn "clean".
- Lệnh sẽ bỏ qua `package.json` và chỉ đọc file `package-lock.json`. Nếu không có thấy file thì sẽ báo lỗi.
- Chỉ tải chính xác phiên bản được ghi trong file `package-lock.json`, không tự cập nhật.
- Trước khi tải module, nó sẽ xóa sạch node_modules và tải lại từ đầu để đảm bảo không có file rác từ trước gây conflict. Nên thường nhanh hơn `npm install` khi tải lại mới vì không cần tính toán phiên bản.
- Được sử dụng khi chạy trên server deploy (CI/CD) để đảm bảo code chạy trên server dùng đúng các thư viện y hệt như lúc lập trình viên chạy trên máy cá nhân hoặc khi dự án bị lỗi liên quan đến thư viện.

### dependencies vs devDependencies

**dependencies:** Đây là những thư viện bắt buộc phải có để ứng dụng có thể chạy được trên server thực tế. Nếu thiếu chúng sẽ báo lỗi và ứng dụng sẽ bị "sập" (crash) ngay lập tức. VD: `express`.
- Lệnh cài đặt:
```bash
npm install <lib-name>
# Hoặc npm i <lib-name>
```

**devDependencies:** Đây là những công cụ chỉ phục vụ cho quá trình lập trình viên viết code và kiểm thử trên máy cá nhân. Người dùng cuối hoặc server thật hoàn toàn không cần đến các thư viện này.
- Lệnh cài đặt:
```bash
npm install --save-dev <lib-name>
# Hoặc npm i -D <lib-name>
```
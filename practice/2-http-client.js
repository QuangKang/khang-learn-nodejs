async function practiceHttpClient() {
    // const apiUrl = 'https://jsonplaceholder.typicode.com/users/1';

    // try {
    //     console.log(`Gửi GET request tới: ${apiUrl}...`);
    //     const response = await fetch(apiUrl);

    //     if (!response.ok) {
    //         throw new Error(`Lỗi HTTP: Status ${response.status}`);
    //     }

    //     const userData = await response.json();

    //     console.log("Lấy dữ liệu thành công");
    //     console.log(`Tên user: ${userData.name}`);
    //     console.log(`Email: ${userData.email}`);
    //     console.log(`Công ty: ${userData.company.name}`);
    // } catch (err) {
    //     console.error("Gọi Api thất bại: ", err.message);
    // }

    /*
    Cần phải cho Server listen http://localhost:3000 trước khi gửi request fetch bằng đoạn code bên dưới.
    */

    const apiUrl = 'http://localhost:3000/api/groceries';

    try {
        console.log(`Gửi GET request tới: ${apiUrl}...`);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Lỗi HTTP: Status ${response.status}`);
        }

        const res = await response.json();

        console.log("Lấy dữ liệu thành công");
        console.table(res.data);
    } catch (err) {
        console.error("Gọi Api thất bại: ", err.message);
    }
}

practiceHttpClient();
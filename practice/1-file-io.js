import fs from 'fs/promises'

async function practiceFileIO() {
    const fileName = 'demo.txt';

    try {
        console.log("Ghi file...");
        await fs.writeFile(fileName, "Hello World!");
        console.log("Hoàn thành ghi file!\n");

        console.log("Đọc nội dung file...");
        const content = await fs.readFile(fileName, 'utf-8');
        console.log("Nội dung file: ", content);

    } catch (err) {
        console.error("Phát hiện lỗi: ", err);
    }
}

practiceFileIO();
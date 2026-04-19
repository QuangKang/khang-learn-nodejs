import { createReadStream } from "fs";
import { writeFile, access } from "fs/promises";

async function practiceStream() {
    const fileName = 'large-file.txt';

    try {
        await access(fileName);
    } catch {
        console.log("Creating test file...");
        const dummy = "Hello".repeat(100000);
        await writeFile(fileName, dummy);
        console.log("Test file created.");
    }

    console.log("Reading File...");

    const readingBlock = createReadStream(fileName, {
        encoding: 'utf8',
        highWaterMark: 1024 * 50
    });
    let chunkCount = 0;
    let total = 0;
    try {
        for await (const chunk of readingBlock) {
            chunkCount++;
            total += chunk.length;
            console.log(`Chunk ${chunkCount} has data length of ${chunk.length}`);
        }
        console.log("Read complete.");
        console.log(`Number of chunks: ${chunkCount}`);
        console.log(`Total length of stream: ${total}`);
    } catch (err) {
        console.error("Failure occured", err);
    }
}

practiceStream();
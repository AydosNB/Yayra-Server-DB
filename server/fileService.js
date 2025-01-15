import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const _fileName = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_fileName)


export const saveFile = (file) => {
    try {
        const fileName = uuidv4() + ".jpg"
        const currentDir = _dirname
        const staticDir = path.join(currentDir, "..", "static")
        const filePath = path.join(staticDir, fileName)
        if (!fs.existsSync(staticDir)) {
            fs.mkdirSync(staticDir, { recursive: true })
        }
        if (file.mv) {
            file.mv(filePath)
            return fileName
        }


    } catch (error) {
        console.error(`Save file error: ${error.message}`)
    }
}

export const updateFile = async (newFile, oldFileName) => {
    try {
        // Papka va fayl yo‘llarini aniqlash
        const staticDir = path.join(_dirname, "..", "static");


        // Eski faylni o'chirish
        if (newFile) {
            const oldFilePath = path.join(staticDir, oldFileName);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
                console.log(`Eski fayl o'chirildi: ${oldFileName}`);
            } else {
                console.warn(`Eski fayl topilmadi: ${oldFileName}`);
            }

            const newFileName = uuidv4() + ".jpg";
            const newFilePath = path.join(staticDir, newFileName);

            newFile.mv(newFilePath);
            console.log(`Yangi fayl saqlandi: ${newFileName}`);

            return newFileName;
        } else {
            return oldFileName;
        }
    } catch (error) {
        console.error(`Update file error: ${error.message}`);
        throw new Error(`Update file error: ${error.message}`);
    }
};

export const updateFileArray = async (images, oldFileNames = []) => {
    try {
        const staticDir = path.join(_dirname, "..", "static");
        const checkedImages = images?.mv ? [images] : [...images]
        const newFileArray = checkedImages.map(image => {
            const newFileName = uuidv4() + ".jpg";
            const newFilePath = path.join(staticDir, newFileName);
            if (image) {
                image.mv(newFilePath);
            }
            return newFileName;
        })
        if (checkedImages.length > 0) {
            oldFileNames.forEach(imageName => {
                const oldFilePath = path.join(staticDir, imageName);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                    console.log(`Eski fayl o'chirildi: ${imageName}`);
                } else {
                    console.warn(`Eski fayl topilmadi: ${imageName}`);
                }
            })
        } else {
            return oldFileNames
        }
        return newFileArray
    } catch (error) {
        console.error(`Update file : ${error.message}`);
        throw new Error(`Update file error: ${error.message}`);
    }
}

export const deleteFile = async (oldFileName) => {
    try {
        const staticDir = path.join(_dirname, "..", "static");

        // Eski faylni o'chirish
        if (typeof oldFileName === "string") {
            const oldFilePath = path.join(staticDir, oldFileName);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            } else {
                console.warn(`Eski fayl topilmadi: ${oldFileName}`);
            }
        } else {
            oldFileName.forEach((name) => {
                const oldFilePath = path.join(staticDir, name);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                } else {
                    console.warn(`Eski fayl topilmadi: ${name}`);
                }
            })
        }
    } catch (error) {
        console.error(`Delete file error: ${error.message}`);
    }
}


export const validateProductData = (req, res, next) => {
    const { name, description, price, categoryId } = req.body;

    // Kerakli maydonlar mavjudligini tekshirish
    if (!name) {
        return res.status(400).json({ message: "Mahsulot nomi (name) talab qilinadi." });
    }
    if (!description) {
        return res.status(400).json({ message: "Mahsulot tavsifi (description) talab qilinadi." });
    }
    if (!price) {
        return res.status(400).json({ message: "Mahsulot narxi (price) raqam bo'lishi kerak." });
    }
    if (!categoryId) {
        return res.status(400).json({ message: "Kategoriya ID (categoryId) talab qilinadi." });
    }

    // Hammasi to'liq bo'lsa, keyingi middleware'ga o'tamiz
    next();
};

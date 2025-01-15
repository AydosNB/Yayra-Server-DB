export const validateCategoryData = (req, res, next) => {
    const { name, description } = req.body;

    // Kerakli maydonlar mavjudligini tekshirish
    if (!name) {
        return res.status(400).json({ message: "Categorya nomi (name) talab qilinadi." });
    }
    if (!description) {
        return res.status(400).json({ message: "Categorya tavsifi (description) talab qilinadi." });
    }

    // Hammasi to'liq bo'lsa, keyingi middleware'ga o'tamiz
    next();
};

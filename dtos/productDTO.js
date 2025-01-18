export class productDTO {
    constructor(product) {
        this.id = product._id,
        this.name = product.name
        this.description = product.description
        this.images = product.images
        this.price = product.price
        this.categoryId = product.categoryId
    }
}
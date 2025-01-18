export class categoryDTO {
    constructor(category) {
        this.id = category._id,
        this.name = category.name
        this.description = category.description,
        this.image = category.image
    }
}
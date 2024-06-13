import { faker } from "@faker-js/faker";

export const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 10000, dec: 0 }),
        stock: faker.number.int({ min: 0, max: 50 }),
        description: faker.commerce.productDescription(),
        owner: faker.internet.email(),
    }
    return product;
}
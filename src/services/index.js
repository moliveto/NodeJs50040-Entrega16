import Users from "../dao/users.dao.js";
import Products from "../dao/products.dao.js";

import UserRepository from "../repository/user.repository.js";
import ProductRepository from "../repository/product.repository.js";

export const usersService = new UserRepository(new Users());
export const productsService = new ProductRepository(new Products());

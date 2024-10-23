import { Checkout } from "./checkout";
import { BulkBuyPricingRule, MultiBuyDiscountPricingRule } from "./pricing-rule.class";
import { ProductModel } from "./product.model";

const pricingRules = [
    new BulkBuyPricingRule('ipd', 4, 499.99),
    new MultiBuyDiscountPricingRule('atv', 3, 2, 109.50),
]

const products = [
    new ProductModel('atv', 'Apple TV', 109.50),
    new ProductModel('ipd', 'Super iPad', 549.99),
    new ProductModel('mbp', 'MacBook Pro', 1399.99),
    new ProductModel('vga', 'VGA adapter', 30.00)
];

const checkout = new Checkout(pricingRules);

checkout.scan({product:products[0],quantity:3});
checkout.scan({product:products[1],quantity:5});
checkout.scan({product:products[3],quantity:3});
checkout.scan({product:products[2], quantity:1});

console.log(checkout.total())


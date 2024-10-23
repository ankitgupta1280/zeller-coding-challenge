import { Checkout } from '../src/checkout';
import { ProductModel } from '../src/product.model';
import { BulkBuyPricingRule, MultiBuyDiscountPricingRule, DefaultPrinciple } from '../src/pricing-rule.class';

describe('Checkout System', () => {
    let products: ProductModel[];
    let checkout: Checkout;

    beforeEach(() => {
        products = [
            new ProductModel('atv', 'Apple TV', 109.50),
            new ProductModel('ipd', 'Super iPad', 549.99),
            new ProductModel('mbp', 'MacBook Pro', 1399.99),
            new ProductModel('vga', 'VGA adapter', 30.00)
        ];

        const pricingRules = [
            new BulkBuyPricingRule('ipd', 4, 499.99),
            new MultiBuyDiscountPricingRule('atv', 3, 2, 109.50),
            new DefaultPrinciple(),
        ];

        checkout = new Checkout(pricingRules);
    });

    test('Scenario 1: atv, atv, atv, vga - Expected total: $249.00', () => {
        checkout.scan({ product: products[0], quantity: 3 });
        checkout.scan({ product: products[3], quantity: 1 });

        expect(checkout.total()).toBe(249.00);
    });

    test('Scenario 2: atv, ipd, ipd, atv, ipd, ipd, ipd - Expected total: $2718.95', () => {
        checkout.scan({ product: products[0], quantity: 2 });
        checkout.scan({ product: products[1], quantity: 5 });

        expect(checkout.total()).toBe(2718.95);
    });

    test('Scenario 2: atv, ipd, ipd, atv, ipd, ipd, ipd, vga, atv - Expected total: $2808.95', () => {
        checkout.scan({product:products[0],quantity:3});
        checkout.scan({product:products[1],quantity:5});
        checkout.scan({product:products[3],quantity:3});

        expect(checkout.total()).toBe(2808.95);
    });
});

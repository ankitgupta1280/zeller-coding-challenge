import { PricingRule } from "./pricing-rule.interface";
import { ProductModel, ScanModel } from "./product.model";

export class Checkout {
    private listOfItems: ScanModel[] = []
    private pricingRules: PricingRule[] = []
    constructor(pricingRules: PricingRule[]){
        this.pricingRules = pricingRules
    }


    scan({product, quantity}:{product: ProductModel; quantity: number}): ScanModel[]{
        this.listOfItems.push({product, quantity, scanned: false} as ScanModel);
        return this.listOfItems;
    }

    total(): number {
        let amount: number = 0;
        for(const rule of this.pricingRules){
            amount += rule.action(this.listOfItems)
        }
        return amount;
    }


}
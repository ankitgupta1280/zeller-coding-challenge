import { PricingRule } from "./pricing-rule.interface";
import { ScanModel } from "./product.model";

export class BulkBuyPricingRule implements PricingRule {
    constructor(
        private sku: string, 
        private offeredQuantity: number, 
        private offeredPrice: number
    ) {}

    action(items: ScanModel[]): number {
        let amount : number = 0;
        for(const item of items){
            if(!item.scanned && item.product.sku === this.sku && this.condition(item)){
                amount += (item.quantity * this.offeredPrice)
                item.scanned = true;
            }
        }
        return amount;
    }

    condition(item: ScanModel): boolean {
        if(item.quantity > this.offeredQuantity)
            return true;
        return false;
    }
}

export class MultiBuyDiscountPricingRule implements PricingRule {
    constructor(
        private sku: string, 
        private offerQuantity: number, 
        private chargeableQuantity: number, 
        private price: number
    ) {}

    action(items: ScanModel[]): number {
        let amount: number = 0;
        for(const item of items){
            if(!item.scanned && item.product.sku === this.sku && this.condition(item)){
                amount += (Math.floor(item.quantity/this.offerQuantity) * this.chargeableQuantity * this.price)
                 + ((item.quantity % this.offerQuantity) * this.price)
                item.scanned = true;
            }
        }
        return amount;
    }

    condition(item: ScanModel): boolean {
        if(item.quantity >= this.offerQuantity)
            return true
        return false;
    }
}

export class DefaultPrinciple implements PricingRule {
    action(items: ScanModel[]): number {
        let amount : number =0;
        for(const item of items){
            if(!item.scanned)
            amount += (item.product.price * item.quantity)
            item.scanned = true;
        }
        return amount
    }

    condition(items: ScanModel): boolean {
        return true;
    }
}
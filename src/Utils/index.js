// @flow
// Utils

import apple from '../Assets/apple-1589869_1280.jpg';
import orange from '../Assets/orange-1995079_1280.jpg';
import banana from '../Assets/bananas-652497_1280.jpg';
import papaya from '../Assets/fruit-2123166_1280.jpg';

export type ItemType = {
  id: number,
  price: number,
  type: string,
  label: string,
  src: string
};

const promos = {
  papaya: (quantity: number, price: number): number => {
    const promoPackagesNumber = parseInt(quantity / 3, 10);
    const nonePromoNumber = parseInt(quantity % 3, 10);
    return (promoPackagesNumber * 2 + nonePromoNumber) * price;
  },
};

export const products: Array<ItemType> = [
  {
    id: 0,
    price: 25,
    type: 'apple',
    label: 'Apple',
    src: apple,
  },
  {
    id: 1,
    price: 30,
    type: 'orange',
    label: 'Orange',
    src: orange,
  },
  {
    id: 2,
    price: 15,
    type: 'banana',
    label: 'Banana',
    src: banana,
  },
  {
    id: 3,
    price: 50,
    type: 'papaya',
    label: 'Papaya',
    src: papaya,
  },
];

export const calculateTotalPrice = (receiptProducts: Map<number, number>) => {
  let price = 0;
  for (const [productId, quantity] of receiptProducts) {
    const productCategory = products.find((product: ItemType): bool => product.id === productId);
    if (productCategory) {
      const productPromo = promos[productCategory.type];
      price += (productPromo
        ? productPromo(quantity, productCategory.price)
        : quantity * productCategory.price);
    }
  }
  return price;
};


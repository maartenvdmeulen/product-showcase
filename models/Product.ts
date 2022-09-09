export interface Product {
    productID: number
    mainDescription: string
    productIngredients?: string
    image: string
    price: number
    groupId: number
    groupDescription: string
    offerings: boolean
    brandId?: number
    brandDescription?: string
}

// brand, WebSubGroups en offers

export function TransformProductsData(products: any[]) {
    const transformedProducts: Product[] = []
    
    products.forEach(product => {
        const transformedProduct: Product = {
            productID: product.ProductID,
            mainDescription: product.MainDescription,
            image: product.ProductPictures[0].Url.split('/artikelen/')[1],
            price: product.ProductPrices[0].Price,
            groupId: product.WebSubGroups[0].WebGroup.WebGroupID,
            groupDescription: product.WebSubGroups[0].WebGroup.Description,
            offerings: product.ProductOffers.length > 0
        }
        if (product.ProductDeclarations[0].ProductIngredients && product.ProductDeclarations[0].ProductIngredients.length > 0)
            transformedProduct.productIngredients = product.ProductDeclarations[0].ProductIngredients[0].Text
        if (product.BrandInfo != null) {
            transformedProduct.brandId = product.BrandInfo.BrandID
            transformedProduct.brandDescription = product.BrandInfo.Description
        }
        transformedProducts.push(transformedProduct)
    });

    return transformedProducts
}
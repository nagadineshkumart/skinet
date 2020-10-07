using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWIthTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWIthTypesAndBrandsSpecification()
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
        }

        public ProductsWIthTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
        }
    }
}
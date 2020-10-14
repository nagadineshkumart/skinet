using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Error;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using InfraStructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private IGenericRepository<Product> _productsRepo { get; }
        private IGenericRepository<ProductBrand> _productBrandsRepo { get; }
        private IGenericRepository<ProductType> _productTypesRepo { get; }
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
        IGenericRepository<ProductBrand> productBrandsRepo,
        IGenericRepository<ProductType> productTypesRepo, IMapper mapper)
        {
            _mapper = mapper;
            _productsRepo = productsRepo;
            _productBrandsRepo = productBrandsRepo;
            _productTypesRepo = productTypesRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWIthTypesAndBrandsSpecification(productParams);
            var products = await _productsRepo.ListAsync(spec);
            var countSpec= new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productsRepo.CountAsync(countSpec);
            var data = _mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDTO>>(products);
            return Ok(new Pagination<ProductToReturnDTO>(productParams.PageIndex,productParams.PageSize,totalItems,data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDTO>> GetProductsById(int id)
        {
            var spec = new ProductsWIthTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);
            if(product == null) 
                return NotFound(new ApiResponse(404));
                
            return _mapper.Map<Product,ProductToReturnDTO>(product);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<Product>> GetProductBrandsAsync()
        {
            return Ok(await _productBrandsRepo.ListAllAsync());
        }
        [HttpGet("types")]
        public async Task<ActionResult<Product>> GetProductTypesAsync()
        {
            return Ok(await _productTypesRepo.ListAllAsync());
        }
    }
}
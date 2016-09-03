using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MyFolllowOwin.Models;
using MyFollowOwin.Models;
using Microsoft.AspNet.Identity;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]
    public class ProductsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Products
        [Route]
        [HttpGet]
        public IQueryable<Products> GetProducts()
        {
            return db.Products;
        }

        // GET: api/Products/5
        //Get Product By ProductId returns specific records in update view.
        [Route]
        [HttpGet]
        [ResponseType(typeof(Products))]
        public IHttpActionResult GetProducts(int id)
        {            
            Products products = db.Products.Find(id);

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }


        // POST: api/Products
        [Route]        
        [ResponseType(typeof(Products))]
        public IHttpActionResult PostProducts(Products products)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }           
            
            products.CreateDate = DateTime.Today;
            products.ModifiedDate = DateTime.Today;
            db.Products.Add(products);           
            db.SaveChanges();
            //Saving of product simultaneously invokes OwnerProductMappings table's post method.
            OwnerProductMappingsController addedproducts = new OwnerProductMappingsController();
            addedproducts.PostOwnerProductMapping(products.Id);
            return CreatedAtRoute("DefaultApi", new { id = products.Id }, products);
        }

        // PUT: api/Products
        [HttpPut]
        [ResponseType(typeof(void))]
        [Route]
        //Edit operation is handled here.
        public IHttpActionResult PutProducts(int id, Products products)
        {
            var state = db.Products.FirstOrDefault(x => x.Id == id);
            if (state != null)
            {
                state.Name = products.Name;
                state.Description = products.Description;
                state.HomepageUrl = products.HomepageUrl;
                state.PlayStoreUrl = products.PlayStoreUrl;
                state.AppStoreUrl = products.AppStoreUrl;
                state.ProductPlatform = products.ProductPlatform;
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw e;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Products))]
        public IHttpActionResult DeleteProducts(int id)
        {
            Products product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductsExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}
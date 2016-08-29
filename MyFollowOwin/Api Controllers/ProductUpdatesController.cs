using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using MyFolllowOwin.Models;
using MyFollowOwin.Models;
using System.Web;
using System.IO;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]
    public class ProductUpdatesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        //// GET: api/ProductUpdates        
        //public IQueryable<ProductUpdates> GetProductUpdates()
        //{
        //    return db.ProductUpdates;
        //}

        // GET: api/ProductUpdates/5
        [Route]
        [HttpGet]
        [ResponseType(typeof(ProductUpdates))]
        public IHttpActionResult GetProductUpdates(int id)
        {
            var productId = db.Products.Find(id);
            //  ProductUpdates productUpdates = db.ProductUpdates.Find(productId.Id);
            var state = db.ProductUpdates.ToList().LastOrDefault(x => x.ProductId == productId.Id);
            
            if (state == null)
            {
                return NotFound();
            }           

            return Ok(state);
        }

        // PUT: api/ProductUpdates/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductUpdates(int id, ProductUpdates productUpdates)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productUpdates.Id)
            {
                return BadRequest();
            }

            db.Entry(productUpdates).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductUpdatesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        
        // POST: api/ProductUpdates
        [Route]
        [HttpPost]
        [ResponseType(typeof(ProductUpdates))]
        public IHttpActionResult PostProductUpdates(int id, ProductUpdates productUpdates)
        {
                
            Products product = db.Products.Find(id);
            if (product != null)
            {              
                productUpdates.ProductId = product.Id;           
            }         

            productUpdates.CreateDate = DateTime.Today;
            productUpdates.ModifiedDate = DateTime.Today;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductUpdates.Add(productUpdates);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productUpdates.Id }, productUpdates);
        }

        // DELETE: api/ProductUpdates/5
        [ResponseType(typeof(ProductUpdates))]
        public IHttpActionResult DeleteProductUpdates(int id)
        {
            ProductUpdates productUpdates = db.ProductUpdates.Find(id);
            if (productUpdates == null)
            {
                return NotFound();
            }

            db.ProductUpdates.Remove(productUpdates);
            db.SaveChanges();

            return Ok(productUpdates);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductUpdatesExists(int id)
        {
            return db.ProductUpdates.Count(e => e.Id == id) > 0;
        }
    }
}
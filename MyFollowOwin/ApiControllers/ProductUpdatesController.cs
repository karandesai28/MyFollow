using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using MyFolllowOwin.Models;
using MyFollowOwin.Models;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]
    public class ProductUpdatesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ProductUpdates/5
        [Route]
        [HttpGet]
        [ResponseType(typeof(ProductUpdates))]
        public IHttpActionResult GetProductUpdates(int id)
        {
            var productId = db.Products.Find(id);           
            var state = db.ProductUpdates.ToList().LastOrDefault(x => x.ProductId == productId.Id);
            
            if (state == null)
            {
                return NotFound();
            }           

            return Ok(state);
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
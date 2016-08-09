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
using System.Web.Http.ModelBinding;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]
    public class ProductOwnersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ProductOwners
        public IQueryable<ProductOwners> GetOwners()
        {
            return db.Owners;
        }
               

        // POST: api/ProductOwners
        [ResponseType(typeof(ProductOwners))]
        [HttpPost]
        [Route]
        public IHttpActionResult PostProductOwners(ProductOwners productOwners)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Owners.Add(productOwners);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productOwners.Id }, productOwners);
        }

        
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductOwnersExists(int id)
        {
            return db.Owners.Count(e => e.Id == id) > 0;
        }
    }
}
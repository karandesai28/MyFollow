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

namespace MyFollowOwin.Api_Controllers
{
    public class ProductOwnersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ProductOwners
        public IQueryable<ProductOwners> GetOwners()
        {
            return db.Owners;
        }

        // GET: api/ProductOwners/5
        [ResponseType(typeof(ProductOwners))]
        public IHttpActionResult GetProductOwners(int id)
        {
            ProductOwners productOwners = db.Owners.Find(id);
            if (productOwners == null)
            {
                return NotFound();
            }

            return Ok(productOwners);
        }

        // PUT: api/ProductOwners/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductOwners(int id, ProductOwners productOwners)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productOwners.Id)
            {
                return BadRequest();
            }

            db.Entry(productOwners).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductOwnersExists(id))
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

        // POST: api/ProductOwners
        [ResponseType(typeof(ProductOwners))]
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

        // DELETE: api/ProductOwners/5
        [ResponseType(typeof(ProductOwners))]
        public IHttpActionResult DeleteProductOwners(int id)
        {
            ProductOwners productOwners = db.Owners.Find(id);
            if (productOwners == null)
            {
                return NotFound();
            }

            db.Owners.Remove(productOwners);
            db.SaveChanges();

            return Ok(productOwners);
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
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using MyFolllowOwin.Models;
using MyFollowOwin.Models;
using Microsoft.AspNet.Identity;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]
    public class OwnerProductMappingsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/OwnerProductMappings
        [Route]
        [HttpGet]
        [ResponseType(typeof(Products))]
        public IHttpActionResult GetAddedProducts()
        {
            var id = User.Identity.GetUserId();
            ApplicationUser user = db.Users.Find(id);
            if (db.Owners != null)
            {
                var ownerId = db.Owners.ToList().LastOrDefault(e => e.UserId == user.Id).Id;
                var addedproducts = db.AddedProducts.Where(e => e.OwnerId == ownerId);

                var product = from item in db.Products
                              from record in addedproducts
                              where item.Id == record.ProductId
                              select item;
                return Ok(product);
            }

            return null;

        }


        // PUT: api/OwnerProductMappings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOwnerProductMapping(int id, OwnerProductMapping ownerProductMapping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ownerProductMapping.Id)
            {
                return BadRequest();
            }

            db.Entry(ownerProductMapping).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnerProductMappingExists(id))
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

        // POST: api/OwnerProductMappings
        [ResponseType(typeof(OwnerProductMapping))]
        public IHttpActionResult PostOwnerProductMapping(int productId)
        {

            OwnerProductMapping ownerProductMapping = new OwnerProductMapping();
            var id = User.Identity.GetUserId();
            ApplicationUser user = db.Users.Find(id);
            var OwnerId = db.Owners.ToList().LastOrDefault(e => e.UserId == user.Id).Id;
            ownerProductMapping.OwnerId = OwnerId;
            ownerProductMapping.ProductId = productId;
            ownerProductMapping.CreateDate = DateTime.Today;
            ownerProductMapping.ModifiedDate = DateTime.Today;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AddedProducts.Add(ownerProductMapping);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ownerProductMapping.Id }, ownerProductMapping);
        }

        // DELETE: api/OwnerProductMappings/5
        [ResponseType(typeof(OwnerProductMapping))]
        public IHttpActionResult DeleteOwnerProductMapping(int id)
        {
            OwnerProductMapping ownerProductMapping = db.AddedProducts.Find(id);
            if (ownerProductMapping == null)
            {
                return NotFound();
            }

            db.AddedProducts.Remove(ownerProductMapping);
            db.SaveChanges();

            return Ok(ownerProductMapping);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OwnerProductMappingExists(int id)
        {
            return db.AddedProducts.Count(e => e.Id == id) > 0;
        }
    }
}
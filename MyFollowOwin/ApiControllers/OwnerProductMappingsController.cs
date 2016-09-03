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
        //Gets the records of added products and return it to owner for (!C)RUD.
        [Route]
        [HttpGet]
        [ResponseType(typeof(Products))]
        public IHttpActionResult GetAddedProducts()
        {
            var id = User.Identity.GetUserId();
            ApplicationUser user = db.Users.Find(id);
                  
            if (db.Owners != null)
            {
                var owner = db.Owners.ToList().LastOrDefault(e => e.UserId == user.Id);
                if (owner != null)
                {
                    var ownerId = owner.Id;
                    var addedproducts = db.AddedProducts.Where(e => e.OwnerId == ownerId);

                    var product = from item in db.Products
                                  from record in addedproducts
                                  where item.Id == record.ProductId
                                  select item;
                    return Ok(product);
                }
           }
            

            return null;

        }        

        // POST: api/OwnerProductMappings
        //Saves the record of products added by respective owners.
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
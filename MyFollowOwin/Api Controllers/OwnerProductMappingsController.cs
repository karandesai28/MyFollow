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
    public class OwnerProductMappingsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/OwnerProductMappings
        [Route]
        [HttpGet]
        public Products[] GetAddedProducts()
        {
            var id = User.Identity.GetUserId();
            ApplicationUser user = db.Users.Find(id);
            int k = 0,n=0,i=0,ownerId=0;
            foreach (var item in db.Owners)
            {
                if (item.UserId == user.Id)
                {
                    ownerId = item.Id;
                }
            }

            foreach(var item in db.AddedProducts)
            {
                if (item.OwnerId==ownerId)
                {
                    i++;
                }
            }
            OwnerProductMapping[] ownerProductMapping = new OwnerProductMapping[i];
            foreach (var row in db.AddedProducts)
            {
                if (row.OwnerId==ownerId)
                {
                    ownerProductMapping[n] = row;
                    n++;
                }
            }
            Products[] product = new Products[n];
            foreach (var row in db.Products)
            {
                foreach (var item in ownerProductMapping)
                {
                    if (item.ProductId==row.Id)
                    {
                        product[k] = row;
                        k++;
                    }
                }
            }
            return product;

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
            OwnerProductMapping ownerProductMapping=new OwnerProductMapping();
            int len = db.Owners.Count();
            ProductOwners[] productOwners = new ProductOwners[len];
            var id = User.Identity.GetUserId();
            ApplicationUser user = db.Users.Find(id);

            foreach(var item in db.Owners)
            {
                if (item.UserId == user.Id)
                {
                    ownerProductMapping.OwnerId = item.Id;
                }
            }
            
          
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
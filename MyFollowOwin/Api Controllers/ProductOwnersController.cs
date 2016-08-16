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
using System.Web;
using Microsoft.AspNet.Identity;
using System.Web.Security;
using MyFollowOwin.Controllers;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]  
     
    public class ProductOwnersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();        
        
        // GET: api/ProductOwners/
        [HttpGet]
        [Route]
        public ProductOwners[] GetOwners()
        {
            int i=0,n = 0;
            int ownerlen = db.Owners.Count();
            
            foreach (var row in db.Owners)
            {
                if (row.OwnerStates == OwnerRequestStates.States.Pending)
                {                   
                    i++;
                }
            }
            ProductOwners[] productOwners = new ProductOwners[i];

            foreach (var row in db.Owners)
            {
                if (row.OwnerStates == OwnerRequestStates.States.Pending)
                {
                    productOwners[n] = row;
                    n++;                    
                }
            }            
            return productOwners;                       
        }

        // POST: api/ProductOwners
        [ResponseType(typeof(ProductOwners))]
        [HttpPost]
        [Route]        
        public IHttpActionResult PostProductOwners(ProductOwners productOwners)
        {
            var id = User.Identity.GetUserId();
            ApplicationUser user = db.Users.Find(id);

            productOwners.UserId = user.Id;
            productOwners.CreateDate = DateTime.Today;
            productOwners.ModifiedDate = DateTime.Today;
          
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Owners.Add(productOwners);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productOwners.Id }, productOwners);
        }

        
        // PUT: api/ProductOwners1/5
        [HttpPut]
        [ResponseType(typeof(void))]
        [Route]
        public IHttpActionResult PutProductOwners(int id, ProductOwners productOwners)
        {           
            var state=db.Owners.FirstOrDefault(x => x.Id == id);            

            if (state != null)
            {
                state.OwnerStates = productOwners.OwnerStates;
                if (productOwners.OwnerStates == OwnerRequestStates.States.Approved)
                {                    
                    var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));                   
                    ProductOwners po = db.Owners.Find(id);                    
                    ApplicationUser user = db.Users.Find(po.UserId);
                    UserManager.RemoveFromRole(user.Id, "EndUsers");
                    UserManager.AddToRole(user.Id, "ProductOwners");
                }
            }           

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
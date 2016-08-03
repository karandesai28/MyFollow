using MyFolllowOwin.Models;
using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace MyFollowOwin.Api_Controllers
{
    public class OwnerController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();

        [ActionName("Owner")]
        [HttpGet]
        // GET: api/ProductOwners
        public IQueryable<ProductOwners> GetOwners()
        {
            return db.Owners;
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

    }
}

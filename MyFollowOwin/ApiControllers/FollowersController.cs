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
    public class FollowersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        
        [HttpGet]
        [Route]
        // GET: api/Followers/
        //Returns the list of products logged in user is following.
        [ResponseType(typeof(Followers))]
        public IHttpActionResult GetFollowers()
        {
            var user = User.Identity.GetUserId();
            var record = db.Followers.Where(e=>e.UserId==user);
            
            if (record == null)
            {
                return NotFound();
            }
            return Ok(record);
        }
        
        //Saves the followers in Followers table
        // POST: api/Followers/S
        [ResponseType(typeof(Followers))]
        [Route]
        [HttpPost]
        public IHttpActionResult PostFollowers([FromBody]int productId)
        {
            Followers followers = new Followers();
            var id = User.Identity.GetUserId();
            ApplicationUser user = new ApplicationUser();
            user = db.Users.Find(id);
            if (user.Id != null)
            {
                followers.UserId = user.Id;
            }
           
            followers.ProductId = productId;
            followers.CreateDate = DateTime.Today;
            followers.ModifiedDate = DateTime.Today;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Followers.Add(followers);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = followers.Id }, followers);
        }

        //On Unfollow, deleting the entry from Followers table.
        // DELETE: api/Followers/5
        [HttpDelete]
        [Route]
        [ResponseType(typeof(Followers))]
        public IHttpActionResult DeleteFollowers(int id)
        {
            var user= User.Identity.GetUserId();
            var followers = db.Followers.FirstOrDefault(e => e.ProductId == id && e.UserId==user);
            
            if (followers == null)
            {
                return NotFound();
            }
            
            db.Followers.Remove(followers);
            db.SaveChanges();

            return Ok(followers);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FollowersExists(int id)
        {
            return db.Followers.Count(e => e.Id == id) > 0;
        }
    }
}
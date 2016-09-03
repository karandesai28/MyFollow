using System.Linq;
using System.Web.Http;
using MyFollowOwin.Models;

namespace MyFollowOwin.Api_Controllers
{
    [RoutePrefix("api/[controller]")]
    public class ApplicationUsersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ApplicationUsers
        [HttpGet]
        //Return the data of Users who has requested to become owner.
        [Route]
        public IHttpActionResult GetApplicationUsers()
        {
            var PendingOwners = from records in db.Owners
                                where records.OwnerStates == OwnerRequestStates.States.Pending
                                select records.UserId;

            var relatedUserRecords = from records in db.Users
                                     from items in PendingOwners
                                     where records.Id == items
                                     select records;

            var users = from values in relatedUserRecords
                        select new { values.Name, values.Email };


            return Ok(users);
        }

        
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApplicationUserExists(string id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}
using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using MyFollowOwin.Models;
using MyFolllowOwin.Models;
using System.Drawing.Imaging;
using System.IO;
using System.Drawing;
using System.Web.Hosting;

namespace MyFollowOwin.ApiControllers
{
    public class AddMediasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/AddMedias
        //This Get Method gets the total number of medias uploaded in single update.
        public int GetMedia()
        {
            var state = db.ProductUpdates.ToList().LastOrDefault().Id;
            var count = db.Media.Where(e => e.UpdateId == state).Count();

            return count;
        }

        // GET: api/AddMedias/5
        //This Get Method gets the media for respective update Id.
        [ResponseType(typeof(AddMedia))]
        public IHttpActionResult GetAddMedia(int id)
        {
            var addMedia = db.Media.Where(e => e.UpdateId == id);
           
            if (addMedia == null)
            {
                return NotFound();
            }

            return Ok(addMedia);
        }        

        // POST: api/AddMedias
        //This Method stores the medias (Pics and Videos) in AddMedias Database.
        [ResponseType(typeof(AddMedia))]
        public IHttpActionResult PostAddMedia(AddMedia addMedia)
        {
            var state = db.ProductUpdates.ToList().LastOrDefault();
            addMedia.UpdateId = state.Id;
            //If the media is an Image, then the image will be stored in ImageDatabase folder and path in Db
            if (addMedia.ProductMedia == ProductMedia.Media.Pictures)
            {
                string convert = addMedia.Path.Substring(addMedia.Path.IndexOf(",") + 1); //Strips off the header from Base 64 Url
                byte[] bytes = Convert.FromBase64String(convert);                         //Converts the base64 url to bytes  
                var extension = ImageFormat.Jpeg;                                         //Picking an extension for the image to be saved
                int randomNo=new Random().Next(int.MinValue, int.MaxValue - 1);           //Generated Random number which will be appended to picture name to keep the name unique and dynamically generated.  
                var assignImageName = string.Concat("Img", randomNo, ".", extension);     //Assigned name to the image

                Image image;
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    //Extracting image from bytes.
                    image = Image.FromStream(ms);
                    var path = HostingEnvironment.ApplicationPhysicalPath;               //Getting the working directory path.
                    image.Save(path + @"ImageDatabase\" + assignImageName, extension);   //Saving the image.
                }
               
                addMedia.Path = "ImageDatabase/" + assignImageName;                     //Saving the Image path in db
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            addMedia.CreateDate = DateTime.Today;
            addMedia.ModifiedDate = DateTime.Today;
            db.Media.Add(addMedia);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = addMedia.Id }, addMedia);
        }
        
        //Disposes the junk.
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AddMediaExists(int id)
        {
            return db.Media.Count(e => e.Id == id) > 0;
        }
    }
}
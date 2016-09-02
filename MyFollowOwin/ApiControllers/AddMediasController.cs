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
        public int GetMedia()
        {
            var state = db.ProductUpdates.ToList().LastOrDefault().Id;
            var count = db.Media.Where(e => e.UpdateId == state).Count();

            return count;
        }

        // GET: api/AddMedias/5
        [ResponseType(typeof(AddMedia))]
        public IHttpActionResult GetAddMedia(int id)
        {
            AddMedia addMedia = db.Media.Find(id);
            if (addMedia == null)
            {
                return NotFound();
            }

            return Ok(addMedia);
        }

        // PUT: api/AddMedias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAddMedia(int id, AddMedia addMedia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != addMedia.Id)
            {
                return BadRequest();
            }

            db.Entry(addMedia).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddMediaExists(id))
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

        // POST: api/AddMedias
        [ResponseType(typeof(AddMedia))]
        public IHttpActionResult PostAddMedia(AddMedia addMedia)
        {
            var state = db.ProductUpdates.ToList().LastOrDefault();
            addMedia.UpdateId = state.Id;
            if (addMedia.ProductMedia == ProductMedia.Media.Pictures)
            {
                string convert = addMedia.Path.Substring(addMedia.Path.IndexOf(",") + 1);
                byte[] bytes = Convert.FromBase64String(convert);
                var extension = ImageFormat.Jpeg;
                int randomNo=new Random().Next(int.MinValue, int.MaxValue - 1);
                var assignImageName = string.Concat("Img", randomNo, ".", extension);

                Image image;
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    image = Image.FromStream(ms);
                    var path = HostingEnvironment.ApplicationPhysicalPath;
                    image.Save(path + @"ImageDatabase\" + assignImageName, extension);
                }
               

                addMedia.Path = "ImageDatabase/" + assignImageName;
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

        // DELETE: api/AddMedias/5
        [ResponseType(typeof(AddMedia))]
        public IHttpActionResult DeleteAddMedia(int id)
        {
            AddMedia addMedia = db.Media.Find(id);
            if (addMedia == null)
            {
                return NotFound();
            }

            db.Media.Remove(addMedia);
            db.SaveChanges();

            return Ok(addMedia);
        }

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
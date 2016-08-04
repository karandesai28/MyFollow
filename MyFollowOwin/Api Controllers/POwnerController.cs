using MyFolllowOwin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyFollowOwin.Api_Controllers
{
    public class POwnerController : ApiController
    {
        // GET: api/POwner
        [HttpGet]
        public IEnumerable<ProductOwners> Get()
        {
            ProductOwners Specs=new ProductOwners();
            return new string[] { "value1", "value2" };
        }

        // GET: api/POwner/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/POwner
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/POwner/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/POwner/5
        public void Delete(int id)
        {
        }
    }
}

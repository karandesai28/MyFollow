using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Security;
using System.Web.Mvc;

namespace MyFollowOwin.Controllers
{
    //Controller for endusers.
    public class HomeController : Controller
    {        
        public ActionResult Index()
        {
            return View();
        }
    }
}
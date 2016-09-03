using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MyFollowOwin.Models;
using System.Net.Mail;

namespace MyFollowOwin.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;          
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;            
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            var user = await UserManager.FindAsync(model.Email, model.Password);            
            
            if (ModelState.IsValid)
            {
                if (user != null)
                {
                    var userid = UserManager.FindByEmail(model.Email).Id;
                    if (UserManager.IsInRole(user.Id, "EndUsers"))
                    {
                        if (!UserManager.IsEmailConfirmed(userid))
                        {
                            return View("Confirm");
                        }
                        else if (user.EmailConfirmed == true)
                        {
                            await SignInAsync(user, model.RememberMe); return RedirectToLocal(returnUrl);
                        }
                    }
                    else if (UserManager.IsInRole(user.Id, "Admin"))
                    {
                        await SignInAsync(user, model.RememberMe); return RedirectToLocalAdmin(returnUrl);
                        //return View("AdminView");
                    }
                    else if(UserManager.IsInRole(user.Id, "ProductOwners"))
                    {
                        await SignInAsync(user, model.RememberMe); return RedirectToLocalOwner(returnUrl);
                    }
                }

                else
                {
                    ModelState.AddModelError("", "Invalid username or password.");
                }
            }
            return View(model);
           }

        public ActionResult RedirectToLocalAdmin(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index","Admin");
        }

        public ActionResult RedirectToLocalOwner(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Owner");
        }
        
        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {            
            if (ModelState.IsValid)
          {
                bool status;
             var user = new ApplicationUser {UserName=model.Email,Email = model.Email, Address = model.Users.Address, BirthDate = model.Users.BirthDate, Name = model.Users.Name };                    
             user.Email = model.Email;
             user.EmailConfirmed = false;
             var result = await UserManager.CreateAsync(user, model.Password);
             if (result.Succeeded)
             {
                var roleresult = UserManager.AddToRole(user.Id, "EndUsers");               
                status=SendMail(user);
                    if (status == true)
                    {
                        return RedirectToAction("Confirm", "Account");
                    }
                    else
                    {
                        ApplicationDbContext db = new ApplicationDbContext();
                        var entityToRemove = db.Users.First(e => e.Id == user.Id);
                        db.Users.Remove(entityToRemove);
                        db.SaveChanges();
                        return RedirectToAction("Failed", "Account");
                    }                     
             }

                AddErrors(result);                
           }
            // If we got this far, something failed, redisplay form
            return View(model);
        }

        public bool SendMail(ApplicationUser user)
        {
            if (ModelState.IsValid)
            {
                MailMessage m = new MailMessage(new MailAddress("karan.desai@promactinfo.com", "MyFollow"), new MailAddress(user.Email));               
                m.Subject = "Confirmation Mail";
                m.Body = string.Format("Dear {0}<BR/>Thank you for your registration,Click to Confirm Email <a href=\"{1}\" title=\"User Email Confirm\">{1}</a>", user.Name, Url.Action("ConfirmEmail", "Account", new { Token = user.Id, Email = user.Email }, Request.Url.Scheme));
                m.IsBodyHtml = true;            
                SmtpClient smtp = new SmtpClient();
              
                try
                {
                    smtp.Send(m);                   
                }
                catch(Exception ex)
                {
                    string errorString = "";
                    errorString += ex.Message + ";" + ex.InnerException;
                    return false;                                       
                }
                
            }
            return true;
        }

        [AllowAnonymous]
        public ActionResult Confirm()
        {            
            return View();
        }

        [AllowAnonymous]
        public ActionResult Failed()
        {                      
            return View();
        }


        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string Token, string Email)
        {
            ApplicationUser user = this.UserManager.FindById(Token);
            if (user != null)
            {
                if (user.Email == Email)
                {
                    user.EmailConfirmed = true;
                    await UserManager.UpdateAsync(user);
                    return RedirectToAction("Login", "Account", new { ConfirmedEmail = user.Email });
                }
                else
                {
                    return RedirectToAction("Confirm", "Account", new { Email = user.Email });
                }
            }
            else
            {
                return RedirectToAction("Confirm", "Account", new { Email = "" });
            }
        }       

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Register", "Account");
        }
        

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}
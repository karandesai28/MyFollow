namespace MyFollowOwin.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyFollowOwin.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MyFollowOwin.Models.ApplicationDbContext context)
        {
            if (!context.Roles.Any(r => r.Name == "Administrator"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Administrator" };

                manager.Create(role);

                //var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
                //UserManager.Create(new ApplicationUser() { UserName = "karan.desai@promactinfo.com" });
                //var user = new ApplicationUser();
                //user.Email = "karan.desai@promactinfo.com";
                //user.BirthDate = new DateTime(1994, 09, 28);
                //user.Name = "Karan Desai";
                //user.Address.Street1 = "C/2 Bhavana Park";
                //user.Address.Street2 = "Karelibaug";
                //user.Address.City = "Vadodara";
                //user.Address.State = "Gujarat";
                //user.Address.Country = "India";
                //user.Address.ContactNo = "9924815850";
                //user.Address.Pin = 390022;
                //var adminresult = UserManager.Create(user, "A.a1234");
                //if (adminresult.Succeeded)
                //{
                //    var result = UserManager.AddToRole(user.Id, "Administrator");
                //}
            }
            

            if (!context.Roles.Any(r => r.Name == "EndUsers"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "EndUsers" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "ProductOwners"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "ProductOwners" };

                manager.Create(role);
            }

        }
    }
}

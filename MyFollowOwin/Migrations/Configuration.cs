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
            var store = new RoleStore<IdentityRole>(context);
            var manager = new RoleManager<IdentityRole>(store);

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var role = new IdentityRole { Name = "Admin" };
                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "EndUsers"))
            {
                var role = new IdentityRole { Name = "EndUsers" };
                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "ProductOwners"))
            {
                var role = new IdentityRole { Name = "ProductOwners" };
                manager.Create(role);
            }

            //Adding a default admin user
            var user = new ApplicationUser
            {
                Email = "karan.desai@promactinfo.com",
                EmailConfirmed = true,
                BirthDate = new DateTime(1994, 09, 28),
                Name = "Karan",
                Address = new AddressInfo
                {
                    Street1 = "C/2 Bhavana Park",
                    Street2 = "Karelibaug",
                    City = "Vadodara",
                    State = "Gujarat",
                    Country = "India",
                    ContactNo = "9924815850",
                    Pin = 390022
                }
            };
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            user.UserName = "Admin";
            string pwd = "A.a1234";

            context.Users.Add(user);
            var result = UserManager.Create(user, pwd);
            if (result.Succeeded)
            {
                UserManager.AddToRole(user.Id, "Admin");
            }

        }
    }
}

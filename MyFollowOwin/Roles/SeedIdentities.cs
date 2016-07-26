using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyFollowOwin
{
    public class Roles
    {
        internal static void SeedIdentities(ApplicationDbContext context)
        {
            if (!context.Roles.Any(r => r.Name == "Administrator"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Administrator" };

                manager.Create(role);
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
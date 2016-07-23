using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFollowOwin.Models
{
    public class EndUsers : IdentityUser
    {
        public class Users:CommonProperty
        {
            [Required]
            [DataType(DataType.Date)]
            public string BirthDate { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            public AddressInfo Address { get; set; }
        }
    }
}
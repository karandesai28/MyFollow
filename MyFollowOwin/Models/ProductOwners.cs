using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using static MyFollowOwin.Models.OwnerRequestStates;

namespace MyFolllowOwin.Models
{
    public class ProductOwners:CommonProperty
    {
        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(1990,2016)]        
        public int FoundedYear { get; set; }

        [Required]
        [Url]
        public string WebsiteUrl { get; set; }

        [Required]
        public States OwnerStates { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser Users { get; set; }
   }
}
using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using static MyFolllowOwin.Models.ProductPlatform;

namespace MyFolllowOwin.Models
{    
    public class Products:CommonProperty
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Url]
        public string HomepageUrl { get; set; }

        [Required]
        [Url]
        public string PlayStoreUrl { get; set; }

        [Required]
        [Url]
        public string AppStoreUrl { get; set; }   
        

        public Platform ProductPlatform { get; set; }        
    }
}
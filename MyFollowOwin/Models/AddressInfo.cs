using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFollowOwin.Models
{
    public class AddressInfo
    {        
        [Required]
        public string Street1 { get; set; }

        public string Street2 { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public long Pin { get; set; }

        [Required]   
        [Range(typeof(long),"1000000000","9999999999",ErrorMessage ="Enter contact number of 10 digits")]    
        public long ContactNo { get; set; }
    }
}
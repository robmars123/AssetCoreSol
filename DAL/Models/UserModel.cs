using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class UserModel
    {
        public string  Username { get; set; }
        public string Token { get; set; }
        public string ValidationMessage {get;set;}
        public bool IsLoginSuccessful { get; set; }
    }
}

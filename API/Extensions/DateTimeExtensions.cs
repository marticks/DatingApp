using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        //como el this es un datetime esto basicamente extiende DateTime y le agrego este método estático.
        public static int CalculateAge(this DateTime dob){
            var today = DateTime.Today;
            var age = today.Year- dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
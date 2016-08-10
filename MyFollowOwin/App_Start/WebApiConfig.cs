using System.Web.Http;

public class WebApiConfig
{
    public static void Register(HttpConfiguration configuration)
    {
        configuration.Routes.MapHttpRoute("DefaultAPI", "api/{controller}/{id}",
          new { id = RouteParameter.Optional });
    }
}
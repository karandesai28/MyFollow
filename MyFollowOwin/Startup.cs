using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyFollowOwin.Startup))]
namespace MyFollowOwin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

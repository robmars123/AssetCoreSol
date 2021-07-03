using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AssetCoreSol
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CORS", corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin()
                    // Apply CORS policy for any type of origin  
                    .AllowAnyMethod()
                    // Apply CORS policy for any type of http methods  
                    .AllowAnyHeader()
                    // Apply CORS policy for any headers  
                    .AllowCredentials());
                // Apply CORS policy for all users  
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //DB Connection
            services.AddDbContext<AssetDataAccess>(options =>
            {
                options.UseSqlServer(Configuration["AppSettings:DBConnection"]);
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors("CORS"); //place before MVC
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}

using System.Linq;
using Contract.Service;
using Contract.Service.Core;
using Contract.Repository;
using Contract.Repository.Base;
using Contract.Service.Cache;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Model.Static;
using Repository;
using Repository.Base;
using Service;
using Service.Cache;
using Service.Caching;
using Service.Core;
using WebApi.Middleware;
using WebApi.HostedService;
using Microsoft.AspNetCore.SignalR;
using Service.Hub;
using DinkToPdf.Contracts;
using DinkToPdf;

namespace portal
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
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var CorsWithOrigins = Configuration["CorsWithOrigins"].ToString().Split(",");
            services.AddCors(options =>
            {

                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins(CorsWithOrigins)
                        .AllowCredentials();
                });
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            AppSettings.Ini(Configuration);
            services.AddSingleton<IDbConnectionQuerry, DbConnectionQuerry>();
            services.AddSingleton<IJwtTokenService, JwtTokenService>();
            services.AddSingleton<ICacheKeyService, CacheKeyService>();
            services.AddSingleton<ICacheService, RedisCacheService>();
            services.AddTransient<IRepositoryWrapper, RepositoryWrapper>();
            services.AddSingleton<IExceptionService, Service.Core.ExceptionService>();
            services.AddTransient<IServiceWrapper, ServiceWrapper>();
            services.AddHostedService<RenewCacheBackgroundService>();
            AddSignalR(services);

        }
        private void AddSignalR(IServiceCollection services)
        {

            services.AddSignalR();
            services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
            services.AddSingleton<ProcessHub>();
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IExceptionService exceptionService, IJwtTokenService tokenService)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
                var path = context.Request.Path.Value;

                // Chỉ thêm header CORS cho file PDF (hoặc mọi file tĩnh nếu bạn muốn)
                var CorsWithOrigins = Configuration["CorsWithOrigins"].ToString().Split(",").ToList();
                if (path != null && path.Contains("/Assets/"))
                {
                    var origin = context.Request.Headers["Origin"].ToString();

                    if (!string.IsNullOrEmpty(origin) && CorsWithOrigins.Contains(origin))
                    {
                        context.Response.Headers.Add("Access-Control-Allow-Origin", origin);
                        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
                    }
                }

                await next.Invoke();
            }); 
            app.ConfigureExceptionHandler(exceptionService, tokenService);
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors("ClientPermission");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<ProcessHub>("hubs/process");
            });
            if (!env.IsDevelopment())
            {

                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";

                    if (env.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });

            } 
        }
    }
}


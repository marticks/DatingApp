using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.MIddleware;
using API.Services;
using API.SignalR;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddApplicationServices(_config );
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly); //hay que decirle donde estan los profiles
            services.AddControllers();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddIdentityServices(_config);
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage(); ahora uso el exception middleware, pero esta sol tambien es aceptable
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseMiddleware<ExceptionMiddleware>();

            //cuando pase a producción debo descomentar eso, para development lo comento porque el https falla por el certificado
            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policy => policy.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials() // agregado para signalR
            .WithOrigins("https://localhost:4200"));

            //basicamente puede hacer cualquiera de esas acciones si viene de esa dir, me falla acá asique deshabilito el cors por ahora. tampoco anda
            //.AllowAnyOrigin()); esto es si en algun momento me rompe la pija el cors

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles(); //si hay un index.html usa eso

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
                endpoints.MapHub<MessageHub>("hubs/message");
                endpoints.MapFallbackToController("Index", "Fallback"); // para que funcione cuando recargas y te manejas por rutas
                // basicamente decis que el tema de los websockets los maneja desde ese endpoint, uno por cada hub
            });
        }
    }
}

using System;
using System.Threading;
using System.Threading.Tasks;
using Contract.Service;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WebApi.HostedService
{
    public class RenewCacheBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        public RenewCacheBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var scope = this._serviceProvider.CreateScope();
            var _serviceWrapper = scope.ServiceProvider.GetRequiredService<IServiceWrapper>();
            await Task.Delay(TimeSpan.FromSeconds(3), stoppingToken);
            //await Task.WhenAll(
            //               _serviceWrapper.Category.SinhVien.UpdateDangHocCachedAsync()
            //           );
            await Task.CompletedTask;
        }
    }
}
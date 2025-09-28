using PuppeteerSharp;

namespace Common
{
    public static class StartupTasks
    {
        private static bool _downloaded = false;

        public static async Task EnsureChromiumAsync()
        {
            if (!_downloaded)
            {
                // Fix: Use the SupportedBrowser enum to specify the browser type  
                var fetcher = new BrowserFetcher(SupportedBrowser.Chrome)
                {
                    CacheDir = Path.Combine(Directory.GetCurrentDirectory(), ".local-chromium")
                };
                await fetcher.DownloadAsync();
                _downloaded = true;
            }
        }
    }
}

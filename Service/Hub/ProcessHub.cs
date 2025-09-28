using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model.Enum;
using Model.Request.Hub;

namespace Service.Hub
{
    public class ProcessHub : BaseHub
    {
        public async Task<bool> OnProcessChangedAsync(ProcessChangedModel request)
        {
            var eventName = eNotifyHubEvent.PROCESS_CHANGED.ToString();
            await SendMessageToUser(request.user_id.ToString(), eventName, request);
            return true;
        }
        
      
    }
}
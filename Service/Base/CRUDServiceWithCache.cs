using Common;
using Contract.Repository.Base;
using Contract.Service.Base;
using Model.Base;
using System.Collections.Generic;

namespace Service.Base
{
    public abstract class CRUDServiceWithCache<T> : BaseService, ICRUDService<T>
    {
        private ICreateService<T> _createService;
        private IReadService<T> _readService;
        private IUpdateService<T> _updateService;
        private IDeleteService<T> _deleteService;
        protected ICRUDRepository<T> _repositoryBase;

        protected CacheKey _cacheKey;
        protected string _itemKeyField;


        public CRUDServiceWithCache(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            this.ConfigKey();
        }
        protected abstract void ConfigKey();


        public async Task<bool> DeleteAsync(int id)
        {
            _deleteService = _deleteService ??= new DeleteService<T>(_serviceProvider, _repositoryBase);
            var result = await _deleteService.DeleteAsync(id);
            try
            {
                if (id.ToString() != string.Empty)
                {
                    await _serviceWrapper.Cache.RemoveListDataAsync(_cacheKey, id.ToString());
                }
                return result;
            }
            catch (System.Exception ex)
            {
                ex.SaveLog();
                return result;
            }
        }

        public async Task<int> InsertAsync(T obj)
        {
            _createService = _createService ??= new CreateService<T>(_serviceProvider, _repositoryBase);
            var id = await _createService.InsertAsync(obj);
            try
            {
                if (id.ToString() != string.Empty)
                {
                    obj.SetPropValue(_itemKeyField, id);

                    await _serviceWrapper.Cache.UpdateItemToListDataAsync(_cacheKey, obj, _itemKeyField, null);

                }
                return id;
            }
            catch (System.Exception ex)
            {
                ex.SaveLog();
                return id;
            }
        }

        public async Task<IEnumerable<T>> SelectAllAsync()
        {
            try
            {
                var list = await _serviceWrapper.Cache.GetListDataAsync<T>(_cacheKey);
                if (list == null || list.Count() == 0)
                {
                    _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
                    list = await _readService.SelectAllAsync();
                    await _serviceWrapper.Cache.SetListDataAsync<T>(_cacheKey, list, _itemKeyField, null);

                }
                return list;
            }
            catch (System.Exception ex)
            {
                ex.SaveLog();
                _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
                var list = await _readService.SelectAllAsync();
                await _serviceWrapper.Cache.SetListDataAsync<T>(_cacheKey, list, _itemKeyField, null);
                return list;
            }

        }

        public async Task<T> SelectByIdAsync(int id)
        {
            try
            {
                var obj = await _serviceWrapper.Cache.GetDataFromListAsync<T>(_cacheKey, id.ToString());
                if (obj == null)
                {
                    _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
                    obj = await _readService.SelectByIdAsync(id);
                    await _serviceWrapper.Cache.UpdateItemToListDataAsync<T>(_cacheKey, obj, _itemKeyField, null); 
                } 
                return obj;
            }
            catch (System.Exception ex)
            {
                ex.SaveLog();
                _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
                return await _readService.SelectByIdAsync(id);
            }
        }


        public async Task<bool> UpdateAsync(T obj)
        {
            _updateService = _updateService ?? new UpdateService<T>(_serviceProvider, _repositoryBase);
            var result = await _updateService.UpdateAsync(obj);
            try
            {
                var id = obj.GetPropValue(_itemKeyField)?.ToString() ?? "";
                if (id != string.Empty)
                {
                    await _serviceWrapper.Cache.UpdateItemToListDataAsync<T>(_cacheKey, obj, _itemKeyField, null);
                }
                return result;
            }
            catch (System.Exception ex)
            {
                ex.SaveLog();
                return result;
            }

        }


        public async Task<bool> ClearCacheAsync()
        {
            await _serviceWrapper.Cache.RemoveListDataAsync(_cacheKey);
            return true;
        }

        public async Task<IEnumerable<T>> ClearCacheThenSelectAllAsync()
        {
            await this.ClearCacheAsync();
            return await this.SelectAllAsync();

        }
        public async Task<bool> EnsureCachedDateUpdatedByLastUpdatTimeAsync()
        {
            try
            {
                var _cacheService = _serviceWrapper.Cache;
                var cachedData = (await _cacheService.GetListDataAsync<T>(_cacheKey)).ToList();
                var cachedDataKeys = cachedData.Select(x => x.GetPropValue(_itemKeyField)?.ToString() ?? "").ToList();
                _readService = _readService ??= new ReadService<T>(_serviceProvider, _repositoryBase);
                var dbValues = await _readService.SelectAllAsync();
                var dbKeys = dbValues.Select(x => x.GetPropValue(_itemKeyField).ConvertToString()).ToList();
                //delete
                var deleteKeys = cachedDataKeys.Where(x => !dbKeys.Contains(x)).ToList();
                var deleteTask = deleteKeys.Select(deleteKey =>
                   {
                       return _cacheService.RemoveListDataAsync(_cacheKey, deleteKey);
                   }).ToList();
                await Task.WhenAll(deleteTask);
                //insert
                var insertKeys = dbKeys.Where(x => !cachedDataKeys.Contains(x)).ToList();
                var insertDatas = dbValues.Where(x => insertKeys.Contains(x.GetPropValue(_itemKeyField).ConvertToString())).ToList();
                var insertTask = insertDatas.Select(x =>
                {
                    return _cacheService.UpdateItemToListDataAsync(_cacheKey, x, _itemKeyField);
                }).ToList();
                await Task.WhenAll(insertTask);
                //update
                var updateDatas = (from a in dbKeys
                                   join b in cachedDataKeys on a equals b
                                   join c in dbValues on a equals c.GetPropValue(_itemKeyField).ConvertToString()
                                   join d in cachedData on b equals d.GetPropValue(_itemKeyField).ConvertToString()
                                   where c.GetPropValue("last_modified_times").ToString() != d.GetPropValue("last_modified_times").ToString()
                                   select c).ToList();
                var updateTask = updateDatas.Select(x =>
                {
                    return _cacheService.UpdateItemToListDataAsync(_cacheKey, x, _itemKeyField);
                }).ToList();
                await Task.WhenAll(updateTask);

                return true;
            }
            catch (System.Exception ex)
            {
                return false;
            }
        }
    }
}

